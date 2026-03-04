import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, rm } from "fs/promises";
import { execFile } from "child_process";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";

function exec(
  cmd: string,
  args: string[],
  options: { timeout: number; cwd?: string }
): Promise<{ stdout: string; stderr: string; code: number | null }> {
  return new Promise((resolve) => {
    execFile(cmd, args, options, (error, stdout, stderr) => {
      resolve({
        stdout: stdout?.toString() || "",
        stderr:
          stderr?.toString() ||
          (error && !stdout ? error.message : "") ||
          "",
        code: error ? (error as NodeJS.ErrnoException & { code?: number }).code === "ENOENT" ? -127 : (error.code as unknown as number ?? 1) : 0,
      });
    });
  });
}

async function checkRuntime(cmd: string): Promise<boolean> {
  const result = await exec(cmd, ["--version"], { timeout: 5000 });
  // macOS stubs return errors like "Unable to locate a Java Runtime"
  return result.code !== -127 && !result.stderr.includes("Unable to locate");
}

export async function POST(request: NextRequest) {
  const workDir = join(tmpdir(), `algoprep-${randomUUID()}`);

  try {
    const { language, source, filename } = await request.json();

    if (!language || !source) {
      return NextResponse.json(
        { error: "Missing language or source" },
        { status: 400 }
      );
    }

    await mkdir(workDir, { recursive: true });

    let stdout = "";
    let stderr = "";

    if (language === "python") {
      const filePath = join(workDir, filename || "solution.py");
      await writeFile(filePath, source);
      const result = await exec("python3", [filePath], {
        timeout: 15000,
        cwd: workDir,
      });
      stdout = result.stdout;
      stderr = result.stderr;
    } else if (language === "java") {
      if (!(await checkRuntime("javac"))) {
        return NextResponse.json({
          stdout: "",
          stderr:
            "Java is not installed. Install it with: brew install openjdk",
        });
      }

      const filePath = join(workDir, filename || "Main.java");
      await writeFile(filePath, source);

      // Compile
      const compile = await exec("javac", [filePath], {
        timeout: 15000,
        cwd: workDir,
      });

      if (compile.stderr) {
        return NextResponse.json({ stdout: "", stderr: compile.stderr });
      }

      // Run
      const result = await exec("java", ["-cp", workDir, "Main"], {
        timeout: 15000,
        cwd: workDir,
      });
      stdout = result.stdout;
      stderr = result.stderr;
    } else if (language === "kotlin") {
      if (!(await checkRuntime("kotlinc"))) {
        return NextResponse.json({
          stdout: "",
          stderr:
            "Kotlin is not installed. Install it with: brew install kotlin",
        });
      }
      if (!(await checkRuntime("java"))) {
        return NextResponse.json({
          stdout: "",
          stderr:
            "Java runtime is required for Kotlin. Install it with: brew install openjdk",
        });
      }

      const filePath = join(workDir, filename || "Main.kt");
      await writeFile(filePath, source);

      const jarPath = join(workDir, "main.jar");
      const compile = await exec(
        "kotlinc",
        [filePath, "-include-runtime", "-d", jarPath],
        { timeout: 30000, cwd: workDir }
      );

      if (compile.stderr && !compile.stdout) {
        return NextResponse.json({ stdout: "", stderr: compile.stderr });
      }

      const result = await exec("java", ["-jar", jarPath], {
        timeout: 15000,
        cwd: workDir,
      });
      stdout = result.stdout;
      stderr = result.stderr;
    } else {
      return NextResponse.json(
        { error: "Unsupported language" },
        { status: 400 }
      );
    }

    return NextResponse.json({ stdout, stderr });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Internal server error",
      },
      { status: 500 }
    );
  } finally {
    // Clean up temp dir
    await rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

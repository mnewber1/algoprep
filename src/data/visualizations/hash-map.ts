import { HashMapStep, HashMapEntry } from "@/lib/visualization-types";

export function generateHashMapSteps(): HashMapStep[] {
  const array = [3, 1, 4, 1, 5, 9];
  const target = 10;
  const steps: HashMapStep[] = [];
  const map: HashMapEntry[] = [];

  steps.push({
    type: "hash-map",
    description: `Find two numbers summing to ${target}. Use a hash map for O(1) lookups.`,
    array,
    currentIndex: -1,
    map: [],
    target,
    lookingFor: null,
    foundIndices: [],
  });

  for (let i = 0; i < array.length; i++) {
    const complement = target - array[i];

    // Check if complement exists in map
    const found = map.find((e) => e.key === complement);

    if (found) {
      steps.push({
        type: "hash-map",
        description: `arr[${i}]=${array[i]}. Need ${complement}. Found in map at index ${found.value}!`,
        array,
        currentIndex: i,
        map: [...map.map((e) => ({ ...e }))],
        target,
        lookingFor: complement,
        foundIndices: [found.value, i],
      });
      return steps;
    }

    steps.push({
      type: "hash-map",
      description: `arr[${i}]=${array[i]}. Need ${complement}. Not in map. Store ${array[i]}->index ${i}.`,
      array,
      currentIndex: i,
      map: [...map.map((e) => ({ ...e })), { key: array[i], value: i }],
      target,
      lookingFor: complement,
      foundIndices: [],
    });

    map.push({ key: array[i], value: i });
  }

  return steps;
}

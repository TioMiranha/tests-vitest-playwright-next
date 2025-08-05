import { getFullEnv } from "@/env/config";

export function sanitizeStr(s: string): string {
  return !s || typeof s != 'string' ? '' : s.trim().normalize();
}

const env = getFullEnv();
console.log(env);

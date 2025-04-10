import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().min(18),
  password: z.string().min(8)
});

const userData = {
  username: "johndoe",
  email: "john@example.com",
  age: 25,
  password: "secure123"
};

try {
  const validatedUser = userSchema.parse(userData);
  console.log("✅ Valid user:", validatedUser);
} catch (err) {
  if (err instanceof z.ZodError) {
    console.log("Validation errors:", err.errors);
    console.log("Flattened errors:", err.flatten());
    console.log("Formatted errors:", err.format());
  } else {
    console.log("Unexpected error:", err);
  }
}
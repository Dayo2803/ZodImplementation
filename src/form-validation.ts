import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type SuccessResult = {
  success: true;
  data: {
    email: string;
    password: string;
  };
};

type ErrorResult = {
  success: false;
  errors: {
    email?: string[];
    password?: string[];
  };
};

type ValidationResult = SuccessResult | ErrorResult;

function validateLogin(data: unknown): ValidationResult {
  const result = loginSchema.safeParse(data);
  
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    };
  }
  
  return {
    success: true,
    data: result.data
  };
}

const result = validateLogin({ email: "test", password: "123" });

if (result.success) {
  console.log("Login success:", result.data.email);
} else {
  console.log("Validation failed:");
  if (result.errors.email) {
    console.log("Email errors:", result.errors.email.join(", "));
  }
  if (result.errors.password) {
    console.log("Password errors:", result.errors.password.join(", "));
  }
}
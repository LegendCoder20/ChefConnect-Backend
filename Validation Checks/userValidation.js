const zod = require("zod");

const registerSchema = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must include at least one special character"
    ),
});

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

module.exports = {
  registerSchema,
  loginSchema,
};

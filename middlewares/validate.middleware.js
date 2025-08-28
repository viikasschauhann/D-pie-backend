import { ApiResponse } from "../utils/index.js";

export const validateSchema = (schema) => (req, res, next) => {
  if (!schema) return next();

  // If schema is z.void, parse undefined, else parse req.body
  const dataToValidate = schema._def.typeName === "ZodVoid" ? undefined : req.body;

  const result = schema.safeParse(dataToValidate);

  if (!result.success) {
    // result.error is always a ZodError here

    console.log("Errors: ", result.error.issues);

    return res.status(400).json(
      new ApiResponse(
        400,
        null,
        "Validation failed",
        result.error?.issues || "Validation Error"
      )
    );
  }
  
  req.body = result.data;

  next();
};

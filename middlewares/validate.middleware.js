import { ApiResponse } from "../utils/index.js";

export const validateSchema = (schema) => (req, res, next) => {
  try {
    if (!schema) return next();

    // special handling if schema is z.void()
    if (schema._def.typeName === "ZodVoid") {
      schema.parse(undefined);
    } else {
      schema.parse(req.body);
    }

    next();
  } catch (err) {
      if (err.name === "ZodError") {
        return res
        .status(400)
        .json(
          new ApiResponse(
            400, 
            null, 
            err.errors && err.errors.length > 0
            ? err.errors.map(e => ({
                path: e.path.join("."),
                code: e.code,
                message: e.message,
              })) : "Validation Error"
          )
        );
      }

      // fallback for other errors
      return res.status(400).json(
        new ApiResponse(400, null, "Validation Error")
      );
  }
};

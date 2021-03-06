import Joi from "joi";

export const movieSchema = {
  postMovie: (object: any) =>
    Joi.object({
      id: Joi.number().required().greater(-1),
      status: Joi.string()
        .valid("none", "now showing", "coming soon")
        .required(),
      startShowingDate: Joi.date().required(),
      stopShowingDate: Joi.date()
        .greater(Joi.ref("startShowingDate"))
        .required(),
      ticketPrice: Joi.number().required(),
      showTimes: Joi.object({
        monday: Joi.array().items(Joi.string()),
        tuesday: Joi.array().items(Joi.string()),
        wednesday: Joi.array().items(Joi.string()),
        thursday: Joi.array().items(Joi.string()),
        friday: Joi.array().items(Joi.string()),
        saturday: Joi.array().items(Joi.string()),
        sunday: Joi.array().items(Joi.string()),
      }).required(),
      isFeature: Joi.boolean().required(),
    })
      .rename("movieId", "id")
      .rename("showtimes", "showTimes")
      .validateAsync(object),
  updateMovie: (object: any) =>
    Joi.object({
      id: Joi.number().required().greater(-1),
      status: Joi.string().valid("none", "now showing", "coming soon"),
      startShowingDate: Joi.date(),
      stopShowingDate: Joi.date().greater(Joi.ref("startShowingDate")),
      ticketPrice: Joi.number(),
      showTimes: Joi.object({
        monday: Joi.array().items(Joi.string()),
        tuesday: Joi.array().items(Joi.string()),
        wednesday: Joi.array().items(Joi.string()),
        thursday: Joi.array().items(Joi.string()),
        friday: Joi.array().items(Joi.string()),
        saturday: Joi.array().items(Joi.string()),
        sunday: Joi.array().items(Joi.string()),
      }),
      isFeature: Joi.boolean(),
    })
      .rename("movieId", "id")
      .rename("showtimes", "showTimes")
      .validateAsync(object, { convert: true }),
};

export const userSchema = {
  postUser: (object: any) =>
    Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required(),
    }).validateAsync(object),
};

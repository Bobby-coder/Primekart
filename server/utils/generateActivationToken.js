import jwt from "jsonwebtoken"

// generate activation token and OTP
export const generateActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  // jwt token creation
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET_KEY,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

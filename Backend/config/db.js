import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connection = connect(process.env.mongoURL);
 
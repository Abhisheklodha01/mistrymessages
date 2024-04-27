<<<<<<< HEAD
import { RESEND_API_KEY } from "@/env_variable";
import { Resend } from "resend";
export const resend = new Resend(RESEND_API_KEY);

=======
import { Resend } from 'resend';
export const resend = new Resend(process.env.RESEND_API_KEY);
>>>>>>> 2cf4e7788e8de4cf838a52b01a12de3d4726392b

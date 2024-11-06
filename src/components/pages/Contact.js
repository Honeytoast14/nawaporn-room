import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import emailjs from "@emailjs/browser";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

const Mailto = ({ email, subject, body, children }) => {
  return (
    <a
      href={`mailto:${email}?subject=${
        encodeURIComponent(subject) || ``
      }&body=${encodeURIComponent(body) || ``}`}
    >
      {children}
    </a>
  );
};

const Input = ({ label, type, name, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <label className="label-style">
          {label} <span className="text-red-600">*</span>
        </label>
        <span
          className={`text-red-600 transition-transform duration-200 ease-in-out transform ${
            errors[name]
              ? `opacity-100 translate-y-0`
              : `opacity-0 translate-y-2`
          }`}
        >
          required
        </span>
      </div>
      <input
        className={`h-10 border w-full block pl-3 ${
          errors[name] ? `border-red-600 animate-shake` : `border-main-black`
        }`}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: {
            value: true,
            message: `required`,
          },
        })}
      />
    </div>
  );
};

const Textarea = ({ name, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div className="flex justify-between">
        <label className="label-style">
          Message <span className="text-red-600">*</span>
        </label>
        <span
          className={`text-red-600 transition-transform duration-200 ease-in-out transform ${
            errors[name]
              ? `opacity-100 translate-y-0`
              : `opacity-0 translate-y-2`
          }`}
        >
          required
        </span>
      </div>
      <textarea
        className={`resize-none p-3 h-10 border w-full block pl-3 ${
          errors[name] ? `border-red-600 animate-shake` : `border-main-black`
        }`}
        style={{ height: "230px" }}
        name={name}
        placeholder={placeholder}
        {...register(name, {
          required: {
            value: true,
            message: "required",
          },
        })}
      />
    </>
  );
};

export default function Contact() {
  const form = useRef();
  const methods = useForm();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, {
        publicKey: "YOUR_PUBLIC_KEY",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="absolute top-0 left-0 w-6/12 h-full bg-main-white text-main-black">
        <h1 className="text-7xl ml-28 pt-36">Contact</h1>
        <div
          className="bg-main-yellow w-11/12 mt-8 px-11 pt-20 absolute right-0 flex flex-row"
          style={{ height: `calc(100vh - 248px)` }}
        >
          <FormProvider {...methods}>
            <form
              className="w-4/6"
              noValidate
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <Input
                label={"Your Name"}
                type={"text"}
                name={"user_name"}
                placeholder={"Name..."}
              />
              <Input
                label={"Your Email"}
                type={"email"}
                name={"user_email"}
                placeholder={"Email..."}
              />
              <Textarea name={"message"} placeholder={"Message..."} />
              <div className="flex justify-center items-center">
                <input
                  className="uppercase bg-main-pink border-solid rounded-xl size w-28 h-12 hover-button mt-6 cursor-pointer"
                  type="submit"
                  value="Send"
                />
              </div>
            </form>
          </FormProvider>
          <div className="flex flex-col ml-10 pt-8 gap-y-7">
            <a
              href="https://linkedin.com/in/nawaporn-sriprathet"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="size-10  hover:scale-125 duration-100 hover:duration-150 ease-in-out"
              />
            </a>
            <a
              href="https://github.com/Honeytoast14"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="size-10  hover:scale-125 duration-100 hover:duration-150 ease-in-out"
              />
            </a>
            <Mailto email={"Email"} subject="Hello & Welcome" body="">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="size-10 hover:scale-125 duration-100 hover:duration-150 ease-in-out"
              />
            </Mailto>
          </div>
        </div>
        <div className="absolute top-0 left-0 bg-main-yellow w-8 h-full"></div>
      </div>
    </>
  );
}

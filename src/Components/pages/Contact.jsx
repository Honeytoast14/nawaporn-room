/* eslint-disable no-useless-escape */

/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import emailjs from "@emailjs/browser";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

const Mailto = ({ subject, body = "", children }) => {
  return (
    <a
      href={`mailto:nawaporn.navis@gmail.com?subject=${
        encodeURIComponent(subject) || ``
      }&body=${encodeURIComponent(body) || ``}`}
    >
      {children}
    </a>
  );
};

const Input = ({ label, type, name, placeholder, pattern }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4 3xl:mb-8">
      <div className="flex justify-between">
        <label className="label-style">
          {label} <span className="text-red-600">*</span>
        </label>
        <span
          className={`transform text-red-600 transition-transform duration-200 ease-in-out ${
            errors[name]
              ? `translate-y-0 opacity-100`
              : `translate-y-2 opacity-0`
          }`}
        >
          required
        </span>
      </div>
      <input
        className={`block h-10 w-full border pl-3 ${
          errors[name] ? `animate-shake border-red-600` : `border-main-black`
        }`}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: true,
          pattern: pattern,
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
          className={`transform text-red-600 transition-transform duration-200 ease-in-out ${
            errors[name]
              ? `translate-y-0 opacity-100`
              : `translate-y-2 opacity-0`
          }`}
        >
          required
        </span>
      </div>
      <textarea
        className={`block h-36 w-full resize-none border p-3 pl-3 xl:h-40 2xl:h-56 ${
          errors[name] ? `animate-shake border-red-600` : `border-main-black`
        }`}
        name={name}
        placeholder={placeholder}
        {...register(name, {
          required: {
            value: true,
          },
        })}
      />
    </>
  );
};

const PopUp = ({ closedPopUp }) => {
  return (
    <div className="absolute top-0 z-40 flex h-full w-full items-center justify-center bg-black bg-opacity-40">
      <div className="relative h-2/5 w-5/6 rounded-3xl bg-main-white sm:w-4/6 md:w-2/6">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-0 top-0 mr-4 mt-4 size-6 hover:cursor-pointer md:size-9"
          onClick={closedPopUp}
        />
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p className="text-xl md:text-3xl">
            The email has been sent&#128077;
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  const form = useRef();
  const methods = useForm();
  var [showPopUp, setShowPopUp] = useState(false);
  const serviceId = import.meta.env.REACT_APP_SERVICE_ID;
  const templateId = import.meta.env.REACT_APP_TEMPLATE_ID;
  const pbKey = import.meta.env.REACT_APP_PUBLIC_KEY;
  const sendEmail = (data, e) => {
    e.preventDefault();

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: pbKey,
      })
      .then(() => {
        setShowPopUp(true);
      });
  };

  const name_validation = {
    label: "Your Name",
    type: "text",
    name: "user_name",
    placeholder: "Name...",
  };

  const email_validation = {
    label: "Your Email",
    type: "email",
    name: "user_email",
    placeholder: "Email...",
    pattern:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };
  return (
    <>
      {showPopUp && <PopUp closedPopUp={() => setShowPopUp(false)} />}
      <div
        className={`white-background-left flex flex-col gap-8 sm:overflow-y-auto`}
      >
        <h1 className="z-30 ml-0 pt-48 text-center sm:ml-28 sm:text-left">
          Contact
        </h1>
        <div className="ml-auto h-full w-full bg-main-yellow sm:w-11/12">
          <div className="flex flex-col bg-main-yellow sm:flex-row">
            <FormProvider {...methods}>
              <form
                ref={form}
                className="w-full px-11 pb-8 pt-10 sm:w-4/6 sm:pt-12"
                noValidate
                onSubmit={methods.handleSubmit(sendEmail)}
              >
                <Input {...name_validation} />
                <Input {...email_validation} />
                <Textarea name={"message"} placeholder={"Message..."} />
                <div className="flex items-center justify-center">
                  <input
                    className="size hover-button mt-6 h-12 w-28 cursor-pointer rounded-xl border-solid bg-main-pink uppercase"
                    type="submit"
                    value="Send"
                  />
                </div>
              </form>
            </FormProvider>

            <div className="flex flex-row justify-center gap-6 gap-y-7 py-6 sm:flex-col sm:justify-start sm:gap-0 sm:pb-0 sm:pt-20 2xl:gap-2">
              <a
                href="https://linkedin.com/in/nawaporn-sriprathet"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="size-10 duration-100 ease-in-out hover:scale-125 hover:duration-150"
                />
              </a>
              <a
                href="https://github.com/Honeytoast14"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="size-10 duration-100 ease-in-out hover:scale-125 hover:duration-150"
                />
              </a>
              <Mailto subject="Hello & Welcome">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="size-10 duration-100 ease-in-out hover:scale-125 hover:duration-150"
                />
              </Mailto>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute left-0 top-0 h-full w-6 bg-main-yellow sm:z-10 xl:w-8`}
      />
    </>
  );
}

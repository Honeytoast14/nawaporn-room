import React, { useRef, useState, useEffect } from "react";
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
        className={`resize-none p-3 border w-full block pl-3 h-36 xl:h-40 2xl:h-56 ${
          errors[name] ? `border-red-600 animate-shake` : `border-main-black`
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
    <div className="w-full h-full bg-black bg-opacity-40 absolute top-0 z-40 flex items-center justify-center ">
      <div className="bg-main-white w-5/6 sm:w-4/6 md:w-2/6 h-2/5 rounded-3xl relative">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-0 top-0 mr-4 mt-4 md:size-9 size-6 hover:cursor-pointer"
          onClick={closedPopUp}
        />
        <div className="flex flex-col items-center justify-center w-full h-full ">
          <p className="text-xl md:text-3xl">
            The email has been sent&#128077;
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);
    return () => clearTimeout(fadeInTimer);
  }, []);

  const form = useRef();
  const methods = useForm();
  var [showPopUp, setShowPopUp] = useState(false);
  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID;
  const pbKey = process.env.REACT_APP_PUBLIC_KEY;
  const sendEmail = (data, e) => {
    e.preventDefault();

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: pbKey,
      })
      .then(
        () => {
          setShowPopUp(true);
        },
        (error) => {}
      );
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
        className={`white-background-left overflow-y-auto flex flex-col gap-8 ${
          isVisible ? `lg:opacity-100` : `lg:opacity-0`
        } duration-200 ease-in-out transition-opacity`}
      >
        <h1 className="sm:ml-28 ml-10 pt-48 z-30">Contact</h1>
        <div className="h-full bg-main-yellow sm:w-11/12 w-full ml-auto">
          <div className="bg-main-yellow flex sm:flex-row flex-col">
            <FormProvider {...methods}>
              <form
                ref={form}
                className="sm:w-4/6 w-full px-11 sm:pt-12 pt-10 pb-8"
                noValidate
                onSubmit={methods.handleSubmit(sendEmail)}
              >
                <Input {...name_validation} />
                <Input {...email_validation} />
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

            <div className="flex sm:flex-col flex-row sm:gap-0 gap-6 2xl:gap-2 sm:justify-start justify-center sm:pt-20 pt-10  gap-y-7">
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
              <Mailto subject="Hello & Welcome">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="size-10 hover:scale-125 duration-100 hover:duration-150 ease-in-out"
                />
              </Mailto>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 bg-main-yellow  xl:w-8 w-6 h-full sm:z-10 ${
          isVisible ? `lg:opacity-100` : `lg:opacity-0`
        } duration-200 ease-in-out transition-opacity`}
      />
    </>
  );
}

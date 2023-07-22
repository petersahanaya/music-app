"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";

import { PostStep, usePostDropDown } from "@state/store/post";
import Input from "@component/input";
import Button from "@component/button";
import DragAndDropFile from "@component/dragNdrop";
import { fadeOutRight, fadeUpAnimate } from "@animation/fade";
import Card from "@component/card";
import { useState } from "react";
import Select from "@component/select";
import Alert from "@component/alert/validate";

const schema = z.object({
  title: z.string().min(5).max(30),
  description: z.string().min(10),
  lyric: z.string().min(10),
  genre: z.enum(["pop", "rock", "mood", "hiphop", "chill"]).nullish(),
  largeImage: z.custom<File>().nullish(),
  coverImage: z.custom<File>().nullish(),
  song: z.custom<File>().nullish(),
});

const selectOptions = [
  {
    label: "pop",
    value: "pop",
  },
  {
    label: "mood",
    value: "mood",
  },
  {
    label: "rock",
    value: "rock",
  },
  {
    label: "hiphop",
    value: "hiphop",
  },
  {
    label: "chill",
    value: "chill",
  },
];

export type OptionsKey = typeof selectOptions;

export type FormSchema = z.infer<typeof schema>;
export type FormKey = "title" | "description" | "lyric" | "genre";

type FormProps = {
  step: PostStep;
  onPressedChangeStep: (step: PostStep) => void;
};

const Form = ({ step, onPressedChangeStep }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setError,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      lyric: "",
    },
    mode: "onBlur",
  });

  const [state, setState] = useState({
    error: "",
    success: false,
    loading: false,
  });

  const onPressedTogglePostDropDown = usePostDropDown(
    (state) => state.onPressedOpenPost
  );

  const onSave = async (data: FormSchema) => {
    if (step === PostStep.SECOND) {
      setState((prev) => ({ ...prev, loading: true }));

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("lyric", data.lyric);
      formData.append("genre", data.genre!);
      formData.append("largeImage", data.largeImage!);
      formData.append("coverImage", data.coverImage!);
      formData.append("song", data.song!);

      const resp = await fetch("http://localhost:3000/api/music", {
        method: "POST",
        headers: {},
        body: formData,
      });

      if (!resp.ok || resp.status !== 201) {
        setState({
          error: "Error when try to post..",
          loading: true,
          success: false,
        });

        return setTimeout(() => {
          setState({ error: "", loading: false, success: false });
        }, 5000);
      }

      const result = await resp.json();

      onPressedTogglePostDropDown();

      setState({ error: "", loading: false, success: false });
    }
  };

  return (
    <>
      {!state.error && (
        <Alert open={state.error ? true : false} type="error">
          {state.error}
        </Alert>
      )}
      <motion.form
        style={{
          width: "100%",
        }}
        variants={fadeUpAnimate}
        className={`w-full flex flex-col justify-start ${
          step === PostStep.INITIAL ? "items-end" : "items-center"
        } items-end gap-12`}
        method="POST"
        onSubmit={handleSubmit(onSave)}
      >
        <AnimatePresence>
          {step === PostStep.INITIAL && (
            <motion.section
              key={step}
              variants={fadeOutRight}
              exit="exit"
              className="w-full flex flex-col justify-start items-end gap-12 "
            >
              <Input
                dirty={dirtyFields}
                error={errors.title?.message || ""}
                hint="Convetty Boom"
                label="title"
                register={register}
              />
              <Input
                dirty={dirtyFields}
                error={errors.description?.message || ""}
                hint="Sweet and Charm songs"
                label="description"
                register={register}
              />
              <Input
                dirty={dirtyFields}
                error={errors.lyric?.message || ""}
                hint="in the middle of night.."
                label="lyric"
                register={register}
              />
              {/* @ts-expect-error */}
              <Select listOfOption={selectOptions} setValue={setValue} />
              <DragAndDropFile
                setValue={setValue}
                dirty={dirtyFields}
                formKey="largeImage"
                typeFiles={["JPG", "PNG", "JPEG"]}
                accept="image/*"
              >
                <div className="text-lg uppercase text-stone-600 font-[500] text-center">
                  <p>Drag your background image here 😄</p>
                </div>
              </DragAndDropFile>
              <DragAndDropFile
                className="mt-[-2rem]"
                setValue={setValue}
                dirty={dirtyFields}
                formKey="coverImage"
                typeFiles={["JPG", "PNG", "JPEG"]}
                accept="image/*"
              >
                <div className="text-lg uppercase text-stone-600 font-[500] text-center">
                  <p>Drag your cover image here 📔</p>
                </div>
              </DragAndDropFile>
              <DragAndDropFile
                className="mt-[-2rem]"
                setValue={setValue}
                dirty={dirtyFields}
                formKey="song"
                typeFiles={["MPEG"]}
                accept="audio/*"
              >
                <div className="text-lg uppercase text-stone-600 font-[500] text-center">
                  <p>Drag your song here 🎵</p>
                </div>
              </DragAndDropFile>
            </motion.section>
          )}
        </AnimatePresence>

        {step === PostStep.SECOND && <Card props={watch()} />}

        <div
          className={`w-full flex items-center ${
            step === PostStep.SECOND ? "justify-around" : "justify-end"
          }`}
        >
          {step === PostStep.SECOND && (
            <>
              <Button
                className="w-[150px] text-center"
                onClick={() => {
                  onPressedChangeStep(PostStep.INITIAL);
                }}
              >
                back
              </Button>
              <Button
                loader={state.loading}
                type="submit"
                className="w-[150px] text-center"
                onClick={() => {}}
              >
                submit
              </Button>
            </>
          )}
          {step === PostStep.INITIAL && (
            <Button
              className="w-[150px] text-center"
              onClick={() => {
                if (
                  dirtyFields.description &&
                  dirtyFields.title &&
                  dirtyFields.lyric
                ) {
                  onPressedChangeStep(PostStep.SECOND);
                } else {
                  setError("description", { message: "required" });
                  setError("title", { message: "required" });
                  setError("lyric", { message: "required" });
                }
              }}
            >
              next
            </Button>
          )}
        </div>
      </motion.form>
    </>
  );
};

export default Form;

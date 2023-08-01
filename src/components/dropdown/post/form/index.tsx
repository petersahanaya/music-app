"use client";

import { z } from "zod";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";

import { PostStep, useError, usePostDropDown } from "@state/store/post";
import Input from "@component/input";
import Button from "@component/button";
import DragAndDropFile from "@component/dragNdrop";
import Select from "@component/select";
import Card from "@component/card";

import { fadeOutRight, fadeUpAnimate } from "@animation/fade";
import { ACCEPTED_GENRE, schema } from "@lib/validation";
import { useRouter } from "next/navigation";

const selectOptions = ACCEPTED_GENRE.map((genre) => ({
  label: genre,
  value: genre,
}));

export type OptionsKey = typeof selectOptions;

export type FormSchema = z.infer<typeof schema>;
export type FormKey = "title" | "description" | "lyric" | "genre";

type FormProps = {
  step: PostStep;
  onPressedChangeStep: (step: PostStep) => void;
};

type FieldError = FieldErrors<{
  title: string;
  description: string;
  lyric: string;
  coverImage: string;
  largeImage: string;
  song: string;
}>;

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

  const state = useError();

  const onPressedTogglePostDropDown = usePostDropDown(
    (state) => state.onPressedOpenPost
  );

  const router = useRouter()

  const onSave = async (result: any) => {
    const data = result as FormSchema;

    if (step === PostStep.SECOND) {
      state.onHandleState({ loading: true });
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("lyric", data.lyric);
      formData.append("genre", data.genre!);
      formData.append("largeImage", data.largeImage!);
      formData.append("coverImage", data.coverImage!);
      formData.append("song", data.song!);

      try {
        const resp = await fetch("http://localhost:3000/api/music", {
          method: "POST",
          headers: {},
          body: formData,
        });

        const result = (await resp.json()) as { message: string };

        if (!resp.ok || resp.status !== 201) {
          state.onHandleState({ error: result.message, loading: false });

          return setTimeout(() => {
            state.onHandleState({ error: "", loading: false, success: false });
          }, 3000);
        }

        state.onHandleState({ success: true, loading: false });
        router.refresh()

        setTimeout(() => {
          state.onHandleState({ success: false });
        }, 3000);

        onPressedTogglePostDropDown();
      } catch (error) {
        if (error instanceof Error) {
          state.onHandleState({ error: error.message, loading: false });

          return setTimeout(() => {
            state.onHandleState({ error: "" });
          }, 3000);
        }
      }
    }
  };

  return (
    <>
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
              className="w-full flex flex-col justify-start items-end gap-2"
            >
              <Input
                dirty={dirtyFields}
                error={errors.title?.message || ""}
                hint="Convetty Boom"
                label="title"
                register={register as unknown as UseFormRegister<FormSchema>}
              />
              <Input
                dirty={dirtyFields}
                error={errors.description?.message || ""}
                hint="Sweet and Charm songs"
                label="description"
                register={register as unknown as UseFormRegister<FormSchema>}
              />
              <Input
                dirty={dirtyFields}
                error={errors.lyric?.message || ""}
                hint="in the middle of night.."
                label="lyric"
                register={register as unknown as UseFormRegister<FormSchema>}
              />
              <Select
                listOfOption={selectOptions}
                setValue={setValue as unknown as UseFormSetValue<FormSchema>}
              />
              <DragAndDropFile
                setValue={setValue as unknown as UseFormSetValue<FormSchema>}
                dirty={dirtyFields}
                formKey="largeImage"
                typeFiles={["JPG", "PNG", "JPEG"]}
                accept="image/*"
                errorMessage={(errors as FieldError).largeImage?.message}
              >
                <div className="text-lg uppercase text-stone-600 font-[500] text-center">
                  <p>Drag your background image here 😄</p>
                </div>
              </DragAndDropFile>
              <DragAndDropFile
                className="mt-[-2rem]"
                setValue={setValue as unknown as UseFormSetValue<FormSchema>}
                dirty={dirtyFields}
                formKey="coverImage"
                typeFiles={["JPG", "PNG", "JPEG"]}
                accept="image/*"
                errorMessage={(errors as FieldError).coverImage?.message}
              >
                <div className="text-lg uppercase text-stone-600 font-[500] text-center">
                  <p>Drag your cover image here 📔</p>
                </div>
              </DragAndDropFile>
              <DragAndDropFile
                className="mt-[-2rem]"
                setValue={setValue as unknown as UseFormSetValue<FormSchema>}
                dirty={dirtyFields}
                formKey="song"
                typeFiles={["MPEG"]}
                accept="audio/*"
                errorMessage={(errors as FieldError).song?.message}
              >
                <div className="text-lg uppercase text-stone-600 font-[500] text-center">
                  <p>Drag your song here 🎵</p>
                </div>
              </DragAndDropFile>
            </motion.section>
          )}
        </AnimatePresence>

        {step === PostStep.SECOND && <Card props={watch() as FormSchema} />}

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
                disabled={state.state.loading}
                loader={state.state.loading}
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
              className="w-full text-center uppercase"
              onClick={() => {
                if (
                  dirtyFields.description &&
                  dirtyFields.title &&
                  dirtyFields.lyric
                ) {
                  onPressedChangeStep(PostStep.SECOND);
                } else {
                  setError("description", {
                    message: "description are required.",
                  });
                  setError("title", { message: "title are required." });
                  setError("lyric", { message: "lyric are required." });
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

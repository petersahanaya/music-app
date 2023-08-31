"use client";
import { ReactClassName } from "@type/types";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormSchema } from "../dropdown/post/form";

type DragAndDropProps = {
  typeFiles: string[];
  setValue: UseFormSetValue<FormSchema>;
  formKey: "largeImage" | "coverImage" | "song";
  dirty: Partial<
    Readonly<{
      title?: boolean | undefined;
      description?: boolean | undefined;
      lyric?: boolean | undefined;
      genre?: boolean | undefined;
      largeImage?: File | null;
      coverImage?: File | null;
      song?: File | null;
    }>
  >;
  accept: "image/*" | "audio/*" | undefined;
  errorMessage?: string;
} & ReactClassName;

const DragAndDropFile = ({
  children,
  className,
  typeFiles,
  formKey,
  dirty,
  setValue,
  accept,
  errorMessage,
}: DragAndDropProps) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const containerRef = useRef<HTMLLabelElement | null>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const { files } = e.dataTransfer as DataTransfer;

      if (!files || !files.length) return;

      const file = files[0];

      const isSupport = typeFiles.some(
        (type) => type.toLowerCase() === file.type.split("/")[1]
      );

      if (!isSupport) {
        setError(`File just support ${typeFiles.join("/").toUpperCase()}`);

        setTimeout(() => {
          setError("");
        }, 1500);
        return;
      }

      if (files!.length !== 1) {
        setError("supported upload just one file");

        setTimeout(() => {
          setError("");
        }, 1500);
        return;
      }

      setValue(formKey, file);

      setSuccess(true);
    },
    [formKey, setValue, typeFiles]
  );

  const handleChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (!files || !files.length) return;

      const file = files[0];

      const isSupport = typeFiles.some(
        (type) => type.toLowerCase() === file.type.split("/")[1]
      );

      if (!isSupport) {
        setError(`File just support ${typeFiles.join("/").toUpperCase()}`);

        setTimeout(() => {
          setError("");
        }, 1500);
        return;
      }

      if (files!.length !== 1) {
        setError("supported upload just one file");

        setTimeout(() => {
          setError("");
        }, 1500);
        return;
      }

      setValue(formKey, file);

      setSuccess(true);
    },
    [formKey, setValue, typeFiles]
  );
  useEffect(() => {
    containerRef.current?.addEventListener("dragover", handleDragOver);
    containerRef.current?.addEventListener("drop", handleDrop);

    return () => {
      containerRef.current?.removeEventListener("dragover", handleDragOver);
      containerRef.current?.removeEventListener("drop", handleDrop);
    };
  }, [handleDrop]);

  return (
    <>
      <div
        className={`w-full h-[120px] border-dotted border-[2px] mb-8 ${className} ${
          errorMessage ? "border-red-500" : "border-stone-600"
        }`}
      >
        <label
          className={`w-full h-full border-dotted border-red-700  flex justify-center items-center`}
          ref={containerRef}
          htmlFor={formKey}
        >
          {!success || dirty[formKey] ? (
            children
          ) : (
            <div className="text-xl uppercase text-stone-600 font-[500] text-center">
              <p>uploaded 😉</p>
              <p className="text-red-400 mt-2 text-xs uppercase text-center w-full ">
                {errorMessage}
              </p>
            </div>
          )}
        </label>
        <input
          onChange={handleChanged}
          id={formKey}
          type="file"
          accept={accept}
          className="hidden"
        />
      </div>
    </>
  );
};

export default DragAndDropFile;

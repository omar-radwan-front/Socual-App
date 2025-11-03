 
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function UploadPost({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef(null);
  const query = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("body", data.body);
      formData.append("image", data.image[0]);

      const res = await axios.put(
        `https://linked-posts.routemisr.com/posts/${id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      toast.success("Post updated successfully 🎉");
      await Promise.all([
        query.invalidateQueries({ queryKey: ["profile"], exact: true }),
        query.invalidateQueries({ queryKey: ["home"], exact: true }),
        query.invalidateQueries({ queryKey: ["getComment"], exact: true }),
        query.invalidateQueries({ queryKey: ["userPost"], exact: true }),
      ]);

      setOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update post ❌");
    } finally {
      setIsLoading(false);
      reset();
      setOpenModal(false);
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="my-2 w-full md:w-fit px-5 py-2.5 
                   bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 
                   hover:from-blue-700 hover:to-purple-800 
                   text-white font-semibold rounded-xl 
                   shadow-md hover:shadow-lg 
                   transition-all duration-300"
      >
        Upload Post
      </Button>

      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
        className="backdrop-blur-md"
      >
        <ModalHeader className="bg-gray-100 dark:bg-gray-800 rounded-t-2xl" />
        <ModalBody className="bg-white dark:bg-gray-900 rounded-b-2xl p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Upload Your Post
            </h3>

            <div>
              <Label htmlFor="body" className="block mb-2 text-gray-700 dark:text-gray-200">
                Title
              </Label>
              <TextInput
                id="body"
                type="text"
                placeholder="Enter post title..."
                {...register("body")}
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div>
              <div className="mb-2 block text-center">
                <Label
                  htmlFor="photo"
                  className="flex justify-center items-center 
                             bg-gradient-to-r from-amber-500 to-orange-600 
                             hover:from-amber-600 hover:to-orange-700 
                             text-white py-4 rounded-xl 
                             cursor-pointer transition-all duration-300 shadow-md"
                >
                  <i className="fa-solid fa-image fa-xl mr-2"></i>
                  Choose Image
                </Label>
              </div>
              <TextInput
                id="photo"
                type="file"
                {...register("image")}
                className="hidden"
              />
            </div>

            <div className="flex justify-center">
              <Button
                disabled={isLoading}
                type="submit"
                className="mt-2 px-8 py-2 rounded-xl 
                           bg-gradient-to-r from-green-500 to-teal-600 
                           hover:from-green-600 hover:to-teal-700 
                           text-white font-semibold 
                           transition-all duration-300"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin text-white"></i>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}


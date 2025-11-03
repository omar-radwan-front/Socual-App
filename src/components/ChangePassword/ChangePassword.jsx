 


import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import toast from "react-hot-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef(null);
  const query = useQueryClient();

  const schema = z.object({
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "must be regex"
      ),
    newPassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "must be regex"
      ),
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `https://linked-posts.routemisr.com/users/change-password`,
        data,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      if (res.data.message === "success") {
        toast.success("Password changed successfully 🎉");
        localStorage.setItem("userToken", res.data.token);

        await Promise.all([
          query.invalidateQueries({ queryKey: ["profile"], exact: true }),
          query.invalidateQueries({ queryKey: ["home"], exact: true }),
          query.invalidateQueries({ queryKey: ["getComment"], exact: true }),
          query.invalidateQueries({ queryKey: ["userPost"], exact: true }),
          query.invalidateQueries({ queryKey: ["ChengProfilePh"], exact: true }),
        ]);

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to change password ❌");
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
                   bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 
                   hover:from-blue-600 hover:to-purple-700 
                   text-white font-semibold rounded-xl 
                   shadow-md hover:shadow-lg 
                   transition-all duration-300"
      >
        Change Password
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
              Change Your Password
            </h3>

            <div>
              <Label
                htmlFor="ChangPass"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300"
              >
                Old Password
              </Label>
              <TextInput
                id="ChangPass"
                type="password"
                {...register("password")}
                placeholder="Enter your old password"
                className="w-full bg-gray-50 dark:bg-gray-800 
                           text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 
                           focus:ring-blue-500 focus:border-blue-500 rounded-lg"
              />
            </div>

            <div>
              <Label
                htmlFor="newPass"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300"
              >
                New Password
              </Label>
              <TextInput
                id="newPass"
                type="password"
                {...register("newPassword")}
                placeholder="Enter your new password"
                className="w-full bg-gray-50 dark:bg-gray-800 
                           text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 
                           focus:ring-blue-500 focus:border-blue-500 rounded-lg"
              />
            </div>

            <div className="flex justify-center">
              <Button
                disabled={isLoading}
                type="submit"
                className="mt-2 px-8 py-2 rounded-xl 
                           bg-gradient-to-r from-blue-500 to-purple-600 
                           hover:from-blue-600 hover:to-purple-700 
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

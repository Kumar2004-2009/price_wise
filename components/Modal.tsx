"use client";
import { FormEvent, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { addUserEmailToProduct } from "@/lib/actions";

interface Props {
  productId: string;
}

const Modal = ({ productId }: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);

    await addUserEmailToProduct(productId,email);
    setIsSubmitting(false);
    setEmail('');
    closeModal()
  };

  const openModal = () => {
    setIsOpen(true);
    setIsSuccess(false);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button 
        type="button" 
        className="py-4 px-4 cursor-pointer bg-white hover:bg-opacity-70 rounded-[30px] text-black text-lg font-semibold" 
        onClick={openModal}
      >
        Track
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <div className="p-3 border border-gray-200 rounded-[10px]">
                        <Image 
                          src="/assets/icons/logo.svg"
                          alt="logo"
                          width={28}
                          height={28}
                        />
                      </div>

                      <button 
                        onClick={closeModal}
                        className="cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Image 
                          src="/assets/icons/x-close.svg"
                          alt="close"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>

                    <h4 className="text-[#282828] text-lg leading-[24px] font-semibold mt-4">
                      Stay updated with product pricing alerts right in your inbox!
                    </h4>

                    <p className="text-sm text-gray-600 mt-2">
                      Never miss a bargain again with our timely alerts!
                    </p>
                  </div>

                  {isSuccess ? (
                    <div className="mt-5 p-4 bg-green-50 text-green-700 rounded-lg">
                      Success! You'll be notified of price changes.
                    </div>
                  ) : (
                    <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="px-5 py-3 mt-3 flex items-center gap-2 border border-gray-300 rounded-[27px] focus-within:ring-1 focus-within:ring-[#282828]">
                        <Image 
                          src="/assets/icons/mail.svg"
                          alt='mail'
                          width={18}
                          height={18}
                        />

                        <input 
                          required
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className='flex-1 pl-1 border-none text-gray-700 text-base focus:outline-none'
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 cursor-pointer py-3 text-white text-base font-semibold border border-[#282828] bg-[#282828] rounded-lg mt-8 hover:bg-[#282828]/90 transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Track'}
                      </button>
                    </form>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
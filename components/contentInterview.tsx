import { motion } from "framer-motion";
import React, { useState } from "react";

const questions = [
  {
    id: 1,
    name: "Behavioral",
    description: "From LinkedIn, Amazon, Adobe",
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Technical",
    description: "From Google, Meta, and Apple",
    difficulty: "Medium",
  },
];

const interviewers = [
  {
    id: "John",
    name: "John",
    description: "Software Engineering",
    level: "L3",
  },
  {
    id: "Richard",
    name: "Richard",
    description: "Product Management",
    level: "L5",
  },
  {
    id: "Sarah",
    name: "Sarah",
    description: "Other",
    level: "L7",
  },
];

export const ContentInterview: React.FC = () => {
  const [selected, setSelected] = useState(questions[0]);
  const [selectedInterviewer, setSelectedInterviewer] = useState(
    interviewers[0]
  );
  const [step, setStep] = useState(1);

  return (
    <figure>
      <div className="bg-white text-[#667380] p-[18px] flex flex-col">
        {step === 1 ? (
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              key={selected.id}
              className="text-[#1a2b3b] text-[14px] leading-[18px] font-semibold absolute"
            >
              {selected.name} Questions
            </motion.span>

            <ul className="mt-[28px] flex">
              <li className="list-none max-w-[400px]">
                Search through all of the questions in the question bank. If you
                don{`'`}t see one you{`'`}re looking for, you can always add it
                in your the {`"`}My Questions{`"`} section.
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              key={selected.id}
              className="text-[#1a2b3b] text-[14px] leading-[18px] font-semibold absolute"
            >
              {selected.name === "Behavioral"
                ? "Tell me about yourself"
                : selectedInterviewer.name === "John"
                ? "What is a Hash Table, and what is the average case for each of its operations?"
                : selectedInterviewer.name === "Richard"
                ? "Uber is looking to expand its product line. How would you go about doing this?"
                : "You have a 3-gallon jug and 5-gallon jug, how do you measure out exactly 4 gallons?"}
            </motion.span>

            <ul className="mt-[28px] flex">
              {selected.name === "Behavioral" ? (
                <li className="list-none max-w-[400px]">
                  Start off by walking me through your resume. Perhaps begin
                  with your internships in college and move to more recent
                  projects.
                </li>
              ) : (
                <li className="list-none max-w-[400px]">
                  Start off by explaining what the function does, and its time
                  and space complexities. Then go into how you would optimize
                  it.
                </li>
              )}
            </ul>
          </div>
        )}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-[12px] flex bg-gray-100 h-[80%] rounded-lg relative ring-1 ring-gray-900/5 shadow-md"
          >
            {selectedInterviewer.name === "John" ? (
              <motion.img
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                key="John"
                src="/placeholders/John.webp"
                alt="John's Interviewer Profile"
                className="absolute top-6 left-6 w-[30%] aspect-video bg-gray-700 rounded ring-1 ring-gray-900/5 shadow-md object-cover"
              />
            ) : selectedInterviewer.name === "Richard" ? (
              <motion.img
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                key="Richard"
                src="/placeholders/Richard.webp"
                alt="Richard's Interviewer Profile"
                className="absolute top-6 left-6 w-[30%] aspect-video bg-gray-700 rounded ring-1 ring-gray-900/5 shadow-md object-cover"
              />
            ) : selectedInterviewer.name === "Sarah" ? (
              <motion.img
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                key="Sarah"
                src="/placeholders/Sarah.webp"
                alt="Sarah's Interviewer Profile"
                className="absolute top-6 left-6 w-[30%] aspect-video bg-gray-700 rounded ring-1 ring-gray-900/5 shadow-md object-cover"
              />
            ) : (
              <div className="absolute top-6 left-6 w-[30%] aspect-video bg-gray-700 rounded"></div>
            )}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-red-400 ring-4 ring-white rounded-full"></div>
          </motion.div>
        )}
        {step === 1 && (
          <ul className="mt-[12px] flex items-center space-x-[2px]">
            <svg
              className="w-4 h-4 text-[#1a2b3b]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
              ></path>
            </svg>

            <p>Search</p>
          </ul>
        )}
        {step === 1 &&
          (selected.name === "Behavioral" ? (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              key={selected.id}
              className="mt-3 grid grid-cols-3 xl:grid-cols-3 gap-2"
            >
              <li className="list-none relative flex items-stretch text-left">
                <div className="group relative w-full">
                  <div className="relative mb-2 flex h-full max-h-[200px] w-full cursor-pointer items-start justify-between rounded-lg p-2 font-medium transition duration-100">
                    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-zinc-900/[7.5%] group-hover:ring-zinc-900/10"></div>
                    <div className="relative flex h-full flex-col overflow-hidden">
                      <div className="flex items-center text-left text-[#1a2b3b]">
                        <p>Why this company?</p>
                      </div>
                      <p className="text-wrap grow font-normal text-[7px]">
                        Why do you want to work for Google?
                      </p>
                      <div className="flex flex-row space-x-1">
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-gray-300 px-[3px] text-[7px] font-normal hover:bg-gray-50">
                          Product Management
                        </p>
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-[#D0E7DC] bg-[#F3FAF1] px-[3px] text-[7px] font-normal hover:bg-[#edf8ea]">
                          <span className="mr-1 flex items-center text-emerald-600">
                            <svg
                              className="h-2 w-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z"
                                fill="#459A5F"
                                stroke="#459A5F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
                                stroke="#F4FAF4"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                          Completed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-none relative flex items-stretch text-left">
                <div className="group relative w-full">
                  <div className="relative mb-2 flex h-full max-h-[200px] w-full cursor-pointer items-start justify-between rounded-lg p-2 font-medium transition duration-100">
                    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-zinc-900/[7.5%] group-hover:ring-zinc-900/10"></div>
                    <div className="relative flex h-full flex-col overflow-hidden">
                      <div className="flex items-center text-left text-[#1a2b3b]">
                        <p>What are you most proud of?</p>
                      </div>
                      <p className="text-wrap grow font-normal text-[7px]">
                        Tell me about the thing you are most proud of. Why is it
                        so important to you?
                      </p>
                      <div className="flex flex-row space-x-1">
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-gray-300 px-[3px] text-[7px] font-normal hover:bg-gray-50">
                          General
                        </p>
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-[#D0E7DC] bg-[#F3FAF1] px-[3px] text-[7px] font-normal hover:bg-[#edf8ea]">
                          <span className="mr-1 flex items-center text-emerald-600">
                            <svg
                              className="h-2 w-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z"
                                fill="#459A5F"
                                stroke="#459A5F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
                                stroke="#F4FAF4"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                          Completed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-none relative flex items-stretch text-left">
                <div className="group relative w-full">
                  <div className="relative mb-2 flex h-full max-h-[200px] w-full cursor-pointer items-start justify-between rounded-lg p-2 font-medium transition duration-100">
                    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-zinc-900/[7.5%] group-hover:ring-zinc-900/10"></div>
                    <div className="relative flex h-full flex-col overflow-hidden">
                      <div className="flex items-center text-left text-[#1a2b3b]">
                        <p>Tell me about yourself</p>
                      </div>
                      <p className="text-wrap grow font-normal text-[7px]">
                        Walk me through your resume, projects, and anything you
                        feel is relevant to your story.
                      </p>
                      <div className="flex flex-row space-x-1">
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-gray-300 px-[3px] text-[7px] font-normal hover:bg-gray-50">
                          Product Management
                        </p>
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-[#D0E7DC] bg-[#F3FAF1] px-[3px] text-[7px] font-normal hover:bg-[#edf8ea]">
                          <span className="mr-1 flex items-center text-emerald-600">
                            <svg
                              className="h-2 w-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z"
                                fill="#459A5F"
                                stroke="#459A5F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
                                stroke="#F4FAF4"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                          Completed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-none relative flex items-stretch text-left">
                <div className="group relative w-full">
                  <div className="relative mb-2 flex h-full max-h-[200px] w-full cursor-pointer items-start justify-between rounded-lg p-2 font-medium transition duration-100">
                    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-zinc-900/[7.5%] group-hover:ring-zinc-900/10"></div>
                    <div className="relative flex h-full flex-col overflow-hidden">
                      <div className="flex items-center text-left text-[#1a2b3b]">
                        <p>What are your strengths?</p>
                      </div>
                      <p className="text-wrap grow font-normal text-[7px]">
                        Tell me about your strengths and why you would make a
                        strong candidate.
                      </p>
                      <div className="flex flex-row space-x-1">
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-gray-300 px-[3px] text-[7px] font-normal hover:bg-gray-50">
                          Software Engineering
                        </p>
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-[#D0E7DC] bg-[#F3FAF1] px-[3px] text-[7px] font-normal hover:bg-[#edf8ea]">
                          <span className="mr-1 flex items-center text-emerald-600">
                            <svg
                              className="h-2 w-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z"
                                fill="#459A5F"
                                stroke="#459A5F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
                                stroke="#F4FAF4"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                          Completed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-none relative flex items-stretch text-left">
                <div className="group relative w-full">
                  <div className="relative mb-2 flex h-full max-h-[200px] w-full cursor-pointer items-start justify-between rounded-lg p-2 font-medium transition duration-100">
                    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-zinc-900/[7.5%] group-hover:ring-zinc-900/10"></div>
                    <div className="relative flex h-full flex-col overflow-hidden">
                      <div className="flex items-center text-left text-[#1a2b3b]">
                        <p>What are your weaknesses?</p>
                      </div>
                      <p className="text-wrap grow font-normal text-[7px]">
                        Tell me about your weaknesses, and how that has impacted
                        your previous work.
                      </p>
                      <div className="flex flex-row space-x-1">
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-gray-300 px-[3px] text-[7px] font-normal hover:bg-gray-50">
                          Product Management
                        </p>
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-[#D0E7DC] bg-[#F3FAF1] px-[3px] text-[7px] font-normal hover:bg-[#edf8ea]">
                          <span className="mr-1 flex items-center text-emerald-600">
                            <svg
                              className="h-2 w-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z"
                                fill="#459A5F"
                                stroke="#459A5F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
                                stroke="#F4FAF4"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                          Completed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </motion.ul>
          ) : (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              key={selected.id}
              className="mt-3 grid grid-cols-3 xl:grid-cols-3 gap-2"
            >
              <li className="list-none relative flex items-stretch text-left">
                <div className="group relative w-full">
                  <div className="relative mb-2 flex h-full max-h-[200px] w-full cursor-pointer items-start justify-between rounded-lg p-2 font-medium transition duration-100">
                    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-zinc-900/[7.5%] group-hover:ring-zinc-900/10"></div>
                    <div className="relative flex h-full flex-col overflow-hidden">
                      <div className="flex items-center text-left text-[#1a2b3b]">
                        <p>Walk me through this function</p>
                      </div>
                      <p className="text-wrap grow font-normal text-[7px]">
                        Explain in as much detail as you can what this function
                        does, including its time and space...
                      </p>
                      <div className="flex flex-row space-x-1">
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-gray-300 px-[3px] text-[7px] font-normal hover:bg-gray-50">
                          Software Engineering
                        </p>
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-[#D0E7DC] bg-[#F3FAF1] px-[3px] text-[7px] font-normal hover:bg-[#edf8ea]">
                          <span className="mr-1 flex items-center text-emerald-600">
                            <svg
                              className="h-2 w-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z"
                                fill="#459A5F"
                                stroke="#459A5F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
                                stroke="#F4FAF4"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                          Completed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-none relative flex items-stretch text-left">
                <div className="group relative w-full">
                  <div className="relative mb-2 flex h-full max-h-[200px] w-full cursor-pointer items-start justify-between rounded-lg p-2 font-medium transition duration-100">
                    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-zinc-900/[7.5%] group-hover:ring-zinc-900/10"></div>
                    <div className="relative flex h-full flex-col overflow-hidden">
                      <div className="flex items-center text-left text-[#1a2b3b]">
                        <p>Uber product expansion</p>
                      </div>
                      <p className="text-wrap grow font-normal text-[7px]">
                        Uber is looking to expand its product line and wants
                        your take on how...
                      </p>
                      <div className="flex flex-row space-x-1">
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-gray-300 px-[3px] text-[7px] font-normal hover:bg-gray-50">
                          Product Management
                        </p>
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-[#D0E7DC] bg-[#F3FAF1] px-[3px] text-[7px] font-normal hover:bg-[#edf8ea]">
                          <span className="mr-1 flex items-center text-emerald-600">
                            <svg
                              className="h-2 w-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z"
                                fill="#459A5F"
                                stroke="#459A5F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
                                stroke="#F4FAF4"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                          Completed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-none relative flex items-stretch text-left">
                <div className="group relative w-full">
                  <div className="relative mb-2 flex h-full max-h-[200px] w-full cursor-pointer items-start justify-between rounded-lg p-2 font-medium transition duration-100">
                    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-zinc-900/[7.5%] group-hover:ring-zinc-900/10"></div>
                    <div className="relative flex h-full flex-col overflow-hidden">
                      <div className="flex items-center text-left text-[#1a2b3b]">
                        <p>Weighing an Airplane</p>
                      </div>
                      <p className="text-wrap grow font-normal text-[7px]">
                        How would you weigh a plane without a scale?
                      </p>
                      <div className="flex flex-row space-x-1">
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-gray-300 px-[3px] text-[7px] font-normal hover:bg-gray-50">
                          Brainteaser
                        </p>
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-[#D0E7DC] bg-[#F3FAF1] px-[3px] text-[7px] font-normal hover:bg-[#edf8ea]">
                          <span className="mr-1 flex items-center text-emerald-600">
                            <svg
                              className="h-2 w-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z"
                                fill="#459A5F"
                                stroke="#459A5F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
                                stroke="#F4FAF4"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                          Completed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-none relative flex items-stretch text-left">
                <div className="group relative w-full">
                  <div className="relative mb-2 flex h-full max-h-[200px] w-full cursor-pointer items-start justify-between rounded-lg p-2 font-medium transition duration-100">
                    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-zinc-900/[7.5%] group-hover:ring-zinc-900/10"></div>
                    <div className="relative flex h-full flex-col overflow-hidden">
                      <div className="flex items-center text-left text-[#1a2b3b]">
                        <p>How would you rebuild Twitter?</p>
                      </div>
                      <p className="text-wrap grow font-normal text-[7px]">
                        Given what you know about Twitter, how would you
                        architect it from the ground up?
                      </p>
                      <div className="flex flex-row space-x-1">
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-gray-300 px-[3px] text-[7px] font-normal hover:bg-gray-50">
                          Systems Design
                        </p>
                        <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-[#D0E7DC] bg-[#F3FAF1] px-[3px] text-[7px] font-normal hover:bg-[#edf8ea]">
                          <span className="mr-1 flex items-center text-emerald-600">
                            <svg
                              className="h-2 w-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z"
                                fill="#459A5F"
                                stroke="#459A5F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
                                stroke="#F4FAF4"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                          Completed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </motion.ul>
          ))}
        {step === 1 && (
          <div className="space-y-2 md:space-y-5 mt-auto">
            <nav
              className="flex items-center justify-between border-t border-gray-200 bg-white px-1 py-[2px] mb-[10px]"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className=" text-[#1a2b3b]">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">9</span> of{" "}
                  <span className="font-medium">500</span> results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <button className="relative inline-flex cursor-auto items-center rounded border border-gray-300 bg-white px-[4px] py-[2px]  font-medium text-[#1a2b3b] hover:bg-gray-50 disabled:opacity-50">
                  Previous
                </button>
                <button className="relative ml-3 inline-flex items-center rounded border border-gray-300 bg-white px-[4px] py-[2px]  font-medium text-[#1a2b3b] hover:bg-gray-50">
                  Next
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </figure>
  );
};

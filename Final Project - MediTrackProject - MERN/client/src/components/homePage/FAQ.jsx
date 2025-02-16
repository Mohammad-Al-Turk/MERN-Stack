import { useState } from "react";
import TopBar from "./TopBar";
import "../../styles/FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is MediTraker?",
      answer:
        "MediTraker is a healthcare appointment management system that helps patients book appointments and track wait times.",
    },
    {
      question: "Who can use MediTraker?",
      answer:
        "Patients, doctors, and assistants can use it to manage appointments and medical records.",
    },
    {
      question: "How do I book an appointment?",
      answer:
        "Yes, you can modify or cancel your appointment through your dashboard.",
    },
    {
      question: "Does MediTraker show wait times?",
      answer:
        "Yes, it provides estimated wait times based on patient flow.",
    },
    {
      question: "How is my medical data stored?",
      answer:
        "Your data is securely encrypted and protected according to industry standards.",
    },
    {
      question: "Can I get an electronic prescription?",
      answer:
        "Yes, doctors can generate prescriptions as PDFs and send them via email.",
    },
    {
      question: "Will I receive appointment reminders?",
      answer:
        "Yes, you’ll get reminders via email or SMS before your appointment.",
    },
    {
      question: "How can doctors manage patient records?",
      answer:
        "Doctors can add notes, diagnoses, and treatment plans through their dashboard.",
    },
    {
      question: "Does MediTraker have a mobile application?",
      answer:
        "No, but we plan to launch one soon.",
    },
  ];

  return (
    <div className="faq-container">
      <TopBar />
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <h3>{faq.question}</h3>
              <span className="toggle-icon">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

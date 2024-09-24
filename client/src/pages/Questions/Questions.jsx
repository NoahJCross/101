import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";
import "./questions.css";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import QuestionView from "../../components/QuestionView/QuestionView";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(firestore, "questions"));
      const questionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionsData);
      setFilteredQuestions(questionsData);
    };
    fetchQuestions();
  }, []);

  const handleSearchChange = (searchQuery) => {
    const value = searchQuery.toLowerCase();
    setFilter(value);
    const filtered = questions.filter(
      (q) =>
        q.title.toLowerCase().includes(value) ||
        q.question.toLowerCase().includes(value) ||
        q.tags.some((tag) => tag.toLowerCase().includes(value))
    );
    setFilteredQuestions(filtered);
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteDoc(doc(firestore, "questions", id));
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
      setFilteredQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="app__questions">
      <SectionTitle>
        <h1>Find Questions</h1>
      </SectionTitle>
      <div className="app__questions-list">
        {filteredQuestions.map((question, index) => (
          <QuestionView key={index} question={question} handleDelete={handleDeleteQuestion} />
        ))}
      </div>
    </div>
  );
};

export default Questions;

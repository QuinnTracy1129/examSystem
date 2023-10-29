import collections from "./collections.json";

const QuestionTypes = {
  collections,
  getLabel: n => collections.find(({ name }) => name === n).label,
  getStructure: n => collections.find(({ name }) => name === n).structure,
  getInstructions: n => collections.find(({ name }) => name === n).instructions,
  getDifficulty: n => {
    switch (n) {
      case 2:
        return "Moderate";

      case 3:
        return "Hard";

      default:
        return "Easy";
    }
  },
};

export default QuestionTypes;

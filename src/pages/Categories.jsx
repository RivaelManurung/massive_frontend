import { Link } from "react-router-dom";

const categoriesData = {
  Technology: [
    { id: 1, title: "Introduction to React" },
    { id: 2, title: "What is Node.js?" },
  ],
  Science: [
    { id: 3, title: "The Wonders of Quantum Computing" },
    { id: 4, title: "AI in Modern Science" },
  ],
  Lifestyle: [
    { id: 5, title: "Minimalist Living" },
    { id: 6, title: "How to Stay Productive" },
  ],
};

const Categories = () => (
  <div className="p-10">
    <h1 className="text-4xl font-bold mb-6">Categories</h1>
    {Object.entries(categoriesData).map(([category, articles], idx) => (
      <div key={idx} className="mb-8">
        <h2 className="text-2xl font-semibold">{category}</h2>
        <ul className="list-disc list-inside mt-2">
          {articles.map((article) => (
            <li key={article.id}>
              <Link
                to={`/article/${article.id}`}
                className="text-blue-500 hover:underline"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default Categories;

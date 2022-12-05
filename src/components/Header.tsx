import { Link } from "react-router-dom";
import { useApp } from "../states/AppState";

const Header: React.FC<{}> = () => {
  const { searchQuery, setSearchQuery } = useApp();

  return (
    <header className="w-full py-4 shadow bg-white">
      <div className="container mx-auto flex flex-col items-center space-y-2 px-6 md:flex-row md:space-x-4 md:space-y-0 lg:px-0 ml-5">
        <Link to="/" className="font-medium ">
          Pokemon App
        </Link>
        <div className="flex flex-end w-2/3">
          <input
            type="text"
            placeholder="Search pokemon by name..."
            className="w-full border-2 border-gray-200 rounded py-2 px-4 md:w-72"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <h1 className="w-fit rounded py-2 text-right px-4 md:w-72 text-right">
          Developed By
          <a
            href="https://abdul-ahad-portfolio.netlify.app/"
            className="text-black-500	"
          >
            <span className="text-red-500 underline p-2">Abdul Ahad</span>
          </a>
        </h1>
      </div>
    </header>
  );
};

export default Header;

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";
import { UICard } from "../components/UICard";
import { WCA_API_URL } from "../utils/wca_api";

interface Competition {
  name: string;
  id: string;
}

export const Home = () => {
  const searchRequest = useRef({});
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const navigate = useNavigate();

  const search = async (query: string) => {
    if (!query || query.length < 2) {
      setCompetitions([]);
      return;
    }

    const obj = {};
    searchRequest.current = obj;
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (searchRequest.current !== obj) return;

    console.log("Searching for:", query);
    const req = await fetch(`${WCA_API_URL}/search/competitions?q=${query}`);
    const data = await req.json();
    console.log(data);
    const comps = data.result as Competition[];
    if (searchRequest.current !== obj) return;
    setCompetitions(comps);
  };

  const renderComps = () => {
    if (!competitions || competitions.length == 0) return <></>;
    return (
      <UICard>
        {competitions.map((comp, i) => {
          return (
            <div className="py-1" key={i}>
              <button 
                className="btn btn-primary btn-block" 
                onClick={() => navigate(`/${comp.id}`)}
              >
                {comp.name}
              </button>
            </div>
          );
        })}
      </UICard>
    );
  };

  return (
    <Layout home={true}>
      <UICard>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search for a competition"
            className="input input-bordered"
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </UICard>

      {renderComps()}
    </Layout>
  );
};

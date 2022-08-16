import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { UICard } from "../components/UICard";
import { WCA_API_URL } from "../utils/wca_api";
import * as WCA from "@wca/helpers";

export const Competition = () => {
  const [compData, setCompData] = useState<WCA.Competition | undefined>();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const compId = params.comp;

  useEffect(() => {
    const dataUrl = `${WCA_API_URL}/competitions/${compId}/wcif/public`;

    fetch(dataUrl).then(async (res) => {
      if (!res.ok) navigate("/");
      const data = await res.json();
      setCompData(data);
    }).catch(() => navigate("/"));
  }, []);

  if (!compData) return(
    <Layout home={false}>
      <UICard>
        <p className="text-2xl text-center font-semibold">
         Loading...
        </p>
      </UICard>
    </Layout>
  );

  const normalizeString = (str: string) => {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("'", "");
  }

  const renderCompetitors = () => {
    const normalQuery = normalizeString(query);
    const persons = query.length < 1 ? 
    compData.persons.filter((person) => {
      if (!person.registration || person.registration.status != 'accepted') return false;
      return true;
    }) : 
    compData.persons.filter((person) => {
      const qId = parseInt(query);
      
      if (!person.registration || person.registration.status != 'accepted') return false;

      if (person.registrantId == qId) return true;

      if (normalizeString(person.name).includes(normalQuery)) return true;

      if (person.wcaId && query.length >= 4 && normalizeString(person.wcaId).includes(normalQuery)) return true;

      return false;
    })
    return(
      <UICard>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
          {persons.map((person, i) => {
            return (
              <tr key={i}>
                <td>{person.registrantId}</td>
                <td>{person.name.replace(new RegExp(' \\(.+\\)'), '')}</td>
              </tr>
            );
        })}
          </tbody>
        </table>
        
      </UICard>
    );
  };

  return (
    <Layout home={false}>
      <UICard>
        <p className="text-2xl text-center font-semibold">
         {compData.name}
        </p>
      </UICard>

      <UICard>
        <div className="form-control">
          <input
            type="text"
            placeholder="Enter a name or an ID"
            className="input input-bordered"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </UICard>

      {renderCompetitors()}
    </Layout>
  );
};

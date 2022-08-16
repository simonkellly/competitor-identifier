export const WCA_API_URL = 'https://www.worldcubeassociation.org/api/v0';
export const WCA_LIVE_API_URL = 'https://live.worldcubeassociation.org/api';


export async function getWCALiveUrl(compName: string, personName: string) {
  const req = await fetch(WCA_LIVE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query:`
        query {
          competitions(filter: "${compName}", limit: 10) {
            id
            name
            competitors {
              id
              name
            }
          }
        }
      `,
    }),
  });

  if (!req.ok) return null;
  const { data } = await req.json();
  if (!data || !data.competitions || data.competitions.length === 0) return null;
  
  const comp = data.competitions[0];
  if (!comp || !comp.competitors || comp.competitors.length === 0) return null;

  const competitor = comp.competitors.find((c: any) => c.name === personName);
  if (!competitor) return null;
  
  console.log(competitor);
  return `https://live.worldcubeassociation.org/competitions/${comp.id}/competitors/${competitor.id}`;
}
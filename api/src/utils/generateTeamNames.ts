import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from 'unique-names-generator';
import pluralize from 'pluralize';

const generateTeamNames = (numberOfTeams: number) =>
  Array.from(Array(numberOfTeams)).map(() => {
    const adjective = uniqueNamesGenerator({
      dictionaries: [adjectives],
      style: 'capital',
    });
    const animal = uniqueNamesGenerator({
      dictionaries: [animals],
      style: 'capital',
    });

    return `${adjective} ${pluralize(animal, 2)}`;
  });

export default generateTeamNames;

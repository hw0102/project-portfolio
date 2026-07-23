import { DB_ID, ENDPOINT, PROJECT_ID, TABLE_ID } from "@/utils/env-setup";
import {
  Client,
  TablesDB,
  Query,
  Permission,
  Role,
  ID,
} from "react-native-appwrite";

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setPlatform("dev.haoran.movieTestProject"); // Your package name / bundle identifier
// track searches

const tablesDB = new TablesDB(client);

// shouldn't there be only one row? not sure if grabbing all rows is a good appraoch.
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await tablesDB.listRows({
      databaseId: DB_ID,
      tableId: TABLE_ID,
      queries: [Query.equal("searchTerm", query)], // optional
      total: true,
    });

    // update current if found
    if (result.total > 0) {
      const existingMovie = result.rows[0];

      await tablesDB.incrementRowColumn({
        databaseId: DB_ID,
        tableId: TABLE_ID,
        rowId: existingMovie.$id,
        column: "count",
      });
      console.log(`An existing entry is updated: ${query}`);
    } else {
      // create new if not found
      await tablesDB.createRow({
        databaseId: DB_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm: query.trim(),
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          movie_id: movie.id.toString(),
          movie_title: movie.title,
        },
        permissions: [Permission.read(Role.any())], // optional
      });
      console.log(`A new entry is created: ${query}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

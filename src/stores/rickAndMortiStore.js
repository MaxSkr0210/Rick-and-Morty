import { ref } from "vue";
import { defineStore } from "pinia";

export const usePersonsStore = defineStore("persons", () => {
  const episodesCache = ref(new Map());
  const filters = ref({});

  const fetchEpisode = async (url) => {
    if (!episodesCache.value.has(url)) {
      const res = await fetch(url);
      const episode = await res.json();
      episodesCache.value.set(url, episode);
    }
  };

  const getEpisode = (url) => {
    return episodesCache.value.get(url);
  };

  const getPersons = async (url = undefined) => {
    const curl = new URL(url || "https://rickandmortyapi.com/api/character");

    for (const key in filters.value) {
      curl.searchParams.set(key, filters.value[key]);
    }

    const res = await fetch(curl.toString());
    const persons = await res.json();

    await Promise.all(persons.results.map((p) => fetchEpisode(p.episode[0])));

    return persons;
  };

  const setFilters = (filter) => {
    filters.value = filter;
  };

  return { getPersons, getEpisode, setFilters };
});

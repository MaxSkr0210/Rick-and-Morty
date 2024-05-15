<script setup>
import { onMounted, ref } from "vue";
import { usePersonsStore } from "./stores/rickAndMortiStore";
import Person from "./components/Person.vue";

const store = usePersonsStore();
const persons = ref([]);
const pageInfo = ref();
const page = ref(1);
const name = ref("");
const selected = ref("");

const getPerson = async (url = undefined) => {
  const { results, info } = await store.getPersons(url);
  pageInfo.value = info;
  persons.value = results;
};

const goNext = async () => {
  if (pageInfo.value.next) {
    getPerson(pageInfo.value.next);
    page.value += 1;
  }
};

const goPrev = async () => {
  if (pageInfo.value.prev) {
    getPerson(pageInfo.value.prev);
    page.value -= 1;
  }
};

const filterPersons = async (e) => {
  e.preventDefault();

  const filter = {};

  if (name.value.trim() !== "") filter.name = name.value;
  if (selected.value !== "") filter.status = selected.value;

  store.setFilters(filter);
  await getPerson();
};

onMounted(async () => {
  await getPerson();
});
</script>

<template>
  <div class="main">
    <div class="filter">
      <form>
        <input type="text" placeholder="Enter name" v-model="name" />
        <select v-model="selected">
          <option value="" selected disabled>Select status</option>
          <option value="dead" selected>Dead</option>
          <option value="alive" selected>Alive</option>
          <option value="uknown" selected>Uknown</option>
        </select>
        <input type="submit" value="Apply" @click="filterPersons" />
      </form>
    </div>
    <div class="persons">
      <Person v-for="person in persons" :key="person.id" :person="person" />
    </div>
    <div class="pagination" v-if="pageInfo">
      <button class="btn prev" :disabled="!pageInfo.prev" @click="goPrev">&#8592;</button>
      <button class="btn page">{{ page }}</button>
      <button class="btn next" :disabled="!pageInfo.next" @click="goNext">&#8594;</button>
    </div>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  justify-content: center;
}

.persons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.prev,
.next {
  cursor: pointer;
}
</style>

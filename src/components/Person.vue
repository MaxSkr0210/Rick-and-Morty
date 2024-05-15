<script setup>
import { computed } from "vue";
import { usePersonsStore } from "../stores/rickAndMortiStore";

const store = usePersonsStore();

const props = defineProps({
  person: {
    type: Object,
    required: true
  }
});

const getNameEpisode = computed(() => {
  return store.getEpisode(props.person.episode[0]).name;
});
</script>

<template>
  <div class="person">
    <div class="personImg">
      <img :src="person.image" :alt="person.image" />
    </div>
    <div class="info">
      <div class="section">
        <h2>{{ person.name }}</h2>
        <span class="status"
          ><span
            :class="{
              dead: person.status === 'Dead',
              alive: person.status === 'Alive',
              unknown: person.status === 'unknown'
            }"
          ></span
          >{{ person.status }}</span
        >
      </div>
      <div class="section">
        <span class="text-gray">Last known location:</span>{{ person.location.name }}
      </div>
      <div class="section"><span class="text-gray">First seen in:</span>{{ getNameEpisode }}</div>
    </div>
  </div>
</template>

<style scoped>
.person {
  width: 500px;
  height: 220px;
  display: flex;
  overflow: hidden;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 0.75rem;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.personImg {
  flex: 2 1 0%;
  width: 100%;
}

.personImg img {
  width: 100%;
  height: 100%;
  margin: 0px;
  opacity: 1;
  transition: opacity 0.5s ease 0s;
  object-position: center center;
  object-fit: cover;
}

.info {
  flex: 3 1 0%;
  position: relative;
  padding: 0.75rem;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
}

.info .section:first-child {
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.info .section {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
}

.info .status {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  text-transform: capitalize;
}

.info span {
  font-size: 16px;
  font-weight: 500;
}

.info span,
.info h2 {
  margin: 0px;
  padding: 0px;
}

.info .dead {
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  background: rgb(214, 61, 46);
  border-radius: 50%;
}

.info .unknown {
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  background: rgb(158, 158, 158);
  border-radius: 50%;
}

.info .alive {
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  background: rgb(85, 204, 68);
  border-radius: 50%;
}

.info .text-gray {
  color: rgb(158, 158, 158);
}

@media screen and (max-width: 650px) {
  article {
    flex-direction: column;
    width: 300px;
    height: auto;
  }
}
</style>

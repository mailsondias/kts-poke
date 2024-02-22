<script setup lang="ts">
import axios from 'axios';

let api = 'https://pokeapi.co/api/v2/pokemon'
let limit
let page = 1

interface PokemonModelType {
  name: string
  url: string
}

const isLoading = ref<boolean>(false)
const pokemonList = ref<PokemonModelType[] | any>([])
const filteredPokemonList = ref<PokemonModelType[] | any>([])
const sentinel = ref<HTMLDivElement | null>(null)
const newPokemonList = ref<PokemonModelType[] | any>([])
const searchQuery = ref<string>('')

async function fetchPokemon(page: number) {
  delay()
  isLoading.value = true

  try {
    let res: any

    if (searchQuery.value) {
      limit = 1025
      const offset = (page - 1) * limit
      res = await axios.get(`${api}?limit=${limit}&offset=${offset}`)
    } else {
      limit = 25
      const offset = (page - 1) * limit
      res = await axios.get(`${api}?limit=${limit}&offset=${offset}`)
    }

    newPokemonList.value = []
    newPokemonList.value = res.data.results

    if (page > 1) {
      pokemonList.value = [...pokemonList.value, ...newPokemonList.value]
      filteredPokemonList.value = pokemonList.value
      return
    }

    pokemonList.value = newPokemonList.value
    filteredPokemonList.value = pokemonList.value

  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
    if (!searchQuery.value) {
      intersectionObserver.observe(sentinel.value!)
    }
  }
}
 
let intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      if (!searchQuery.value) {
        fetchPokemon(++page)
      }
    }
  },
  {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  }
)

const delay = function() {
  setTimeout(() => {}, 3 * 1000)
}

async function searchPokemon(query: string) {
  delay()
  searchQuery.value = query

  if (!searchQuery.value) {
    filteredPokemonList.value = pokemonList.value
    return
  }

  await fetchPokemon(1)

  const foundedPokemon = await pokemonList.value.filter((pokemon: any) => pokemon.name.toLowerCase().startsWith(searchQuery.value.toLowerCase()))

  filteredPokemonList.value = []
  
  if (foundedPokemon) {
    filteredPokemonList.value = foundedPokemon
  }
}

onMounted(() => {
  fetchPokemon(page)
});
</script>

<template>
  <main>
    <pk-input v-model="searchQuery" @search="searchPokemon" />

    <section class="list-section">
      <h3>Pokemons</h3>
      <div class="list">
        <pk-card
          v-for="(pokemon, idx) in filteredPokemonList"
          :key="idx"
          :pokemon="pokemon"
        />
      </div>
      <div ref="sentinel">
        <p v-if="isLoading" class="mt-4 mb-10">Loading...</p>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  @apply w-full max-w-[858px] m-auto mt-6 px-4;
}
.list-section {
  @apply w-full mt-10 pb-20 justify-center;

  h3 {
    @apply font-bold mb-6 block text-center md:text-left;
  }

  .list {
    @apply flex flex-wrap gap-4 justify-center;
  }
}
</style>
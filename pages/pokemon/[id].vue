<script lang="ts" setup>
import axios from 'axios';

interface AbilityModelType {
  name: string
}

interface PokemonModelType {
  name: string
  abilities: AbilityModelType[]
}

const route = useRoute()

const id = computed(() => {
  return route.params.id
})

const api = `https://pokeapi.co/api/v2/pokemon/${id.value}`

const isLoading = ref<boolean>(true)
const pokemon = ref<PokemonModelType | null>(null)

const thumbnail = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id.value}.png`
})

async function getPokemon() {
  try {
    const res = await axios.get(api)
    pokemon.value = res.data
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
  
  getPokemonAbilityDescriptions(pokemon.value?.abilities)
}

async function getAbilityDescription(abilityUrl: string) {
  try {
    const res = await axios.get(abilityUrl);
    const shortEffect = res.data.effect_entries.find(entry => entry.language.name === 'en').short_effect;
    return shortEffect;
  } catch (error) {
    console.error('Error fetching ability description:', error);
    return null;
  }
}

const abilityDescriptions = ref<Array<object>>([]);

async function getPokemonAbilityDescriptions(abilities: any) {
  try {    
    for (const ability of abilities) {
      const description = await getAbilityDescription(ability.ability.url);
      abilityDescriptions.value.push(description);
    }

    return abilityDescriptions;
  } catch (error) {
    console.error('Error fetching ability descriptions:', error);
    return [];
  }
}

const router = useRouter()

function handleBack() {
  router.go(-1)
}

onMounted(() => {
  getPokemon()
})
</script>

<template>
  <div>
    <p v-if="isLoading" class="p-4">Loading...</p>
    <div v-else>
      <article class="card">
        <div class="thumb">
          <img :src="thumbnail" :alt="pokemon?.name" />
        </div>
        <h3>{{ pokemon?.name }}</h3>
        <div class="kind">
          <span
            v-for="(kind, idx) in pokemon?.types"
            :key="idx"
            class="pill"
            :class="`bg-${kind.type.name}`"
          >
            {{ kind.type.name }}
          </span>
        </div>
      </article>
      <article class="card">
        <h3>Skills</h3>
        <p
          v-for="(ability, idx) in abilityDescriptions"
          :key="idx"
        >
          {{ ability }}
        </p>
      </article>
      <button class="button" @click="handleBack">Voltar</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply w-11/12 max-w-[541px] rounded-lg shadow-md bg-white flex flex-col text-center mt-8 mx-auto p-4 pt-4;

  h3 {
    @apply capitalize font-semibold;
  }

  p {
    @apply py-2 my-2 text-left;
  }

  + .card {
    @apply h-auto divide-y divide-[#ccc];
  }
}
.kind {
  @apply flex gap-2 justify-center w-full pt-4;

  > span {
    @apply rounded-xl px-2 justify-center;
  }
}
.pill {
  @apply block text-white py-1 uppercase text-[9px];
}
.thumb {
  @apply flex justify-center max-w-44 mx-auto mb-4;
}
.button {
  @apply mt-10 py-4 block font-semibold text-[#00A3FF] mx-auto;
}
</style>

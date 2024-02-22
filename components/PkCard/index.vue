<script lang="ts" setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()

interface PokemonModelType {
  name: string
  url: string
}

interface PropsModelType {
  pokemon: PokemonModelType
}

const props = defineProps<PropsModelType>()

const pokemon = computed(() => {
  return props.pokemon.name
})

const id = computed(() => {
  return props.pokemon.url.split('/').at(6)
})

const thumbnail = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id.value}.png`
})

interface TypeModelType {
  type: string
}

const types = ref<TypeModelType[] | null>(null)

async function getTypes() {
  try {
    const res = await axios.get(props.pokemon.url)
    types.value = res.data.types
  } catch (error: any) {
    console.error(error.message)
  }
}

function handleRedirect(id: any) {
  router.push(`/pokemon/${id.toString()}`)
}

onMounted(() => {
  getTypes()
})
</script>

<template>
  <article class="card" @click="handleRedirect(id)">
    <div class="thumb">
      <img :src="thumbnail" :alt="pokemon" />
    </div>
    <h3>{{ props.pokemon.name }}</h3>
    <p>Code: {{ id }}</p>
    <div class="kind">
      <span
        v-for="(kind, idx) in types"
        :key="idx"
        class="pill"
        :class="`bg-${kind.type.name}`"
      >
        {{ kind.type.name }}
      </span>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.card {
  @apply rounded-lg w-[152px] min-h-[190px] shadow-md bg-white flex flex-col text-center mb-4 p-4 pt-2 pb-2 cursor-pointer transition-all;

  h3 {
    @apply capitalize font-semibold;
  }

  p {
    @apply text-xs mt-2;
  }

  &:hover {
    @apply -mt-1;
  }
}
.kind {
  @apply flex gap-2 justify-center w-full pt-5;

  > span {
    @apply rounded-xl px-2 justify-center;
  }
}
.thumb {
  @apply flex justify-center;
}
.pill {
  @apply block text-white py-1 uppercase text-[9px] w-auto h-auto;
}
.bg-grass {
  @apply bg-['#08FEC3'];
}
.bg-poison {
  @apply bg-['#AF08FE'];
}
.bg-water {
  @apply bg-['#00A3FF'];
}
.bg-fire {
  @apply bg-['#FE0808'];
}
.bg-electric {
  @apply bg-['#FFB800'];
}
.bg-ground {
  @apply bg-['#85826E'];
}
.bg-fairy {
  @apply bg-['#FBA1EC'];
}
.bg-normal {
  @apply bg-['#C4C4C4'];
}
.bg-flying {
  @apply bg-['#5317FC'];
}
.bg-default {
  @apply bg-['#0E0E0E'];
}
.bg-bug {
  @apply bg-['#A6B91A'];
}
.bg-rock {
  @apply bg-['#B6A136'];
}
.bg-ghost {
  @apply bg-['#735797'];
}
.bg-dragon {
  @apply bg-['#6F35FC'];
}
.bg-dark {
  @apply bg-['#705746'];
}
.bg-steel {
  @apply bg-['#B7B7CE'];
}
.bg-fighting {
  @apply bg-['#C22E28'];
}
.bg-ice {
  @apply bg-['#96D9D6'];
}
.bg-psychic {
  @apply bg-['#F95587'];
}
</style>

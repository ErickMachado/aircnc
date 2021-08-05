<template>
  <div class="new-spot container">
    <h2>Cadastre um novo <strong>spot</strong></h2>
    <form @submit.prevent="handleSpotCreation">
      <div class="file-field">
        <input
          @input="handleImagePreview"
          type="file"
          accept="image/png, image/jpeg"
        />
        <img
          v-if="imagePreviewUrl"
          class="preview"
          :src="imagePreviewUrl"
          alt=""
        />
        <img v-else src="@/assets/camera.svg" alt="" />
      </div>
      <div class="field">
        <label for="company">Empresa</label>
        <input
          v-model.lazy.trim="spot.company"
          type="text"
          id="company"
          placeholder="Nome da empresa"
        />
      </div>
      <div class="field">
        <label for="price">Preço</label>
        <input
          v-model.number="spot.price"
          type="number"
          id="price"
          placeholder="Preço"
        />
        <span class="message">Deixe zerado caso seja gratuito</span>
      </div>
      <h3>Tecnologias que a empresa utiliza</h3>
      <div class="field">
        <input v-model="tagValue" @keydown.enter="addTag" type="text" />
        <span class="message">Separe por virgula e aperte enter</span>
      </div>
      <ul class="tech__list">
        <li v-for="(tech, index) in techs" :key="index" class="tech__item">
          <span>{{ tech }}</span>
          <span @click="removeTag">X</span>
        </li>
      </ul>
      <Button text="Cadastrar spot" :disabled="isDisabled" />
    </form>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import FirebaseService from '@/services/firebase'
import Vue from 'vue'

export default Vue.extend({
  components: {
    Button
  },
  computed: {
    isDisabled() {
      return (
        !this.spot.company || this.techs.length === 0 || !this.imagePreviewUrl
      )
    }
  },
  data() {
    return {
      imageBlob: {},
      imagePreviewUrl: '',
      spot: {
        company: '',
        price: 0
      },
      tagValue: '',
      techs: []
    }
  },
  methods: {
    addTag() {
      if (this.tagValue.includes(',')) {
        const tags = this.tagValue.split(',')
        for (const tag of tags) {
          tag.trim().toLowerCase()
          if (this.techs.includes(tag)) {
            alert('Tecnologia ja adicionada')
          } else {
            this.techs.push(tag)
          }
        }
      } else {
        if (this.techs.includes(this.tagValue.trim().toLowerCase())) {
          alert('Tecnologia ja adicionada')
        } else {
          this.techs.push(this.tagValue.trim().toLowerCase())
        }
      }

      this.tagValue = ''
    },
    handleImagePreview(event) {
      this.imageBlob = event.target.files[0]
      this.imagePreviewUrl = URL.createObjectURL(this.imageBlob)
    },
    async handleSpotCreation() {
      try {
        await FirebaseService.createSpot({
          authorId: JSON.parse(localStorage.getItem('user')).id,
          company: this.spot.company,
          image: this.imageBlob,
          price: this.spot.price
        })
      } catch (_) {
        alert('Deu ruim!')
      }
    },
    removeTag(index) {
      this.techs.splice(index, 1)
    }
  },
  name: 'NewSpot'
})
</script>

<style scoped>
.new-spot {
  box-shadow: 0px 9px 80px rgba(0, 0, 0, 0.07),
    0px 3.75998px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 2.01027px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 1.12694px 10.0172px rgba(0, 0, 0, 0.035),
    0px 0.598509px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 0.249053px 2.21381px rgba(0, 0, 0, 0.0196802);
  margin: 128px auto 0;
  max-width: 375px;
  padding: 3.2rem;
  width: 100%;
}

.new-spot h2 {
  font-size: 1.8rem;
  margin-bottom: 3.2rem;
  text-align: center;
}

.file-field {
  align-items: center;
  border: 1px dashed rgba(0, 0, 0, 0.3);
  border-radius: 0.2rem;
  display: flex;
  height: 150px;
  justify-content: center;
  position: relative;
  width: 100%;
}

.file-field input {
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  position: absolute;
  width: 100%;
}

.preview {
  border-radius: 0.2rem;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
  position: absolute;
  width: 100%;
}

.new-spot form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.message {
  color: rgba(0, 0, 0, 0.3);
  font-size: 1.4rem;
}

.tech__list {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tech__item {
  align-items: center;
  background-color: var(--primary);
  border-radius: 999px;
  color: var(--light);
  display: flex;
  font-weight: 600;
  font-size: 1.2rem;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
}

.tech__item span:last-child {
  align-items: center;
  align-items: center;
  background-color: var(--light);
  border: none;
  border-radius: 50%;
  color: var(--primary);
  cursor: pointer;
  display: flex;
  font-size: 1.2rem;
  height: 16px;
  justify-content: center;
  line-height: 1;
  width: 16px;
}
</style>

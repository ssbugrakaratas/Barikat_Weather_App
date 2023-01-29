<template>
  <div>
    <div class="row justify-content-center">
      <div class="col text-center">
        <div class="mb-3">
          <label class="form-label fw-bold fs-3">Şehir Seçiniz</label>
          <select v-model="selected_city" class="form-select form-select-lg">
            <option v-for="city in cities" :value="city">
              {{ city.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="col text-center">
        <div class="mb-3">
          <label class="form-label fw-bold fs-3">Gün Sayısı Seçiniz</label>
          <select v-model="num_of_days" class="form-select form-select-lg">
            <option v-for="index in 10" :value="index">
              {{ index }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col" v-for="(data, index) in temperature_datas">
        <div class="card">
          <h1 class="text-center mt-2">{{ selected_city.label }}</h1>
          <h1 class="text-center">{{ data.avgtempC }} C</h1>
          <div class="card-body">
            <h5 class="card-title text-center">{{ data.date }}</h5>
            <div class="row justify-content-end">
              <button class="btn mb-2" @click="show_details(data)">
                <i class="bi bi-three-dots-vertical"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-modal
      :is-open="show_detail_modal"
      @close-modal="show_detail_modal = !show_detail_modal"
    >
      <div style="max-height: 70vh; overflow-y: scroll">
        <pre>
            {{ detail_data }}
        </pre>
      </div>
    </my-modal>
  </div>
</template>

<script>
import Api from '../service/Api';

export default {
  name: 'Home',

  data() {
    return {
      data: 222,
      cities: [
        { id: 1, label: 'Istanbul' },
        { id: 2, label: 'Adana' },
        { id: 3, label: 'Ankara' },
        { id: 4, label: 'Izmir' },
      ],
      selected_city: { id: 1, label: 'Istanbul' },
      temperature_datas: [],
      show_detail_modal: false,
      detail_data: null,
      num_of_days: 3,
    };
  },

  methods: {
    get_weather_data() {
      let send_data = {
        day: this.num_of_days,
        city: this.selected_city.label,
      };
      Api.get('get_weather_data', send_data)
        .then(response => {
          if (response.data.status) {
            this.temperature_datas = response.data.data.weather;
          } else {
            alert('bir hata oluştu');
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    show_details(data) {
      this.detail_data = data;
      this.show_detail_modal = true;
    },
  },
  watch: {
    selected_city(val) {
      if (val) {
        this.get_weather_data();
      }
    },
    num_of_days(val) {
      if (val) {
        this.get_weather_data();
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.get_weather_data();
    }, 300);
  },
};
</script>

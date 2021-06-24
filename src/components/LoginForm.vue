<template>
 <div>
    <v-container class="fill-height" fluid>
          <v-row justify="center">
    <v-col
      cols="12"
      sm="10"
      md="8"
      lg="6"
    >
      <v-card ref="form">
        <v-card-text>
            <v-text-field
            ref="username"
            v-model="username"
            :rules="[() => !!username || 'This field is required']"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            :rules="[() => !!password || 'This field is required']"
            label="Password"
            required
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text :to="`/register`" >
            Register
          </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
            color="primary"
            text
            @click="submit"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
      </v-container>
      </div>
</template>

<script>
  export default {
    data: () => ({
      errorMessages: '',
      password: null,
      username: null,
      formHasErrors: false,
    }),

    computed: {
      form () {
        return {
          username: this.username,
          password: this.password
        }
      },
    },

    methods: {
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      },
    },
  }
</script>
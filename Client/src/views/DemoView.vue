<template>
    <h3>Form Demo</h3>

    <div class="flex justify-content-center align-content-center">
        <div class="card">
            <form
                v-if="loaded"
                @submit.prevent="handleSubmit()"
                class="p-fluid"
            >
                <div class="field">
                    <span class="p-float-label">
                        <InputText
                            id="name"
                            v-model="name.value"
                            :class="{
                                'p-invalid':
                                    !name.isValid && name.touched,
                            }"
                            @input="name.touched = true"
                            @blur="name.touched = true"
                        />
                        <label for="name">
                            Username
                            <span class="p-error">*</span>
                        </label>
                    </span>
                    <small
                        v-if="!name.isValid && name.touched"
                        v-for="error in name.errors"
                        class="p-error"
                    >
                        {{ error }} <br />
                    </small>
                </div>

                <div class="field">
                    <span class="p-float-label">
                        <InputNumber
                            id="name"
                            v-model="age.value"
                            show-buttons
                            :class="{
                                'p-invalid':
                                    !age.isValid && age.touched,
                            }"
                            @input="age.update($event.value)"
                            @blur="age.touched = true"
                        />
                        <label for="name">
                            Age
                            <span class="p-error">*</span>
                        </label>
                    </span>
                    <small
                        v-if="!age.isValid && age.touched"
                        v-for="error in age.errors"
                        class="p-error"
                    >
                        {{ error }} <br />
                    </small>
                </div>
            </form>
        </div>
    </div>

    <div class="flex justify-content-center align-content-center">
        <div class="card">
            <pre>
              <code>
                {{ JSON.stringify(model.values, undefined, 2) }}
              </code>
            </pre>
        </div>
    </div>
</template>

<script lang="ts">
    import FormInput from "@/modules/forms/models/FormInput";
    import FormModel from "@/modules/forms/models/FormModel";
    import Validators from "@/modules/forms/Validators";
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "DemoView.vue",
        data() {
            return {
                loaded: false,
                submitted: false,
                model: {} as FormModel,
            };
        },
        methods: {
            handleSubmit() {
                this.submitted = true;
            },
        },
        computed: {
            name() {
                return this.model.get("name") as FormInput<string>;
            },
            age() {
                return this.model.get("age") as FormInput<number>;
            },
        },
        created() {
            this.model = new FormModel([
                new FormInput<string>("name", "Jardine000", [
                    Validators.minLength(2),
                    Validators.maxLength(10),
                ]),
                new FormInput<number>("age", 20, [
                    Validators.minNumber(18),
                    Validators.maxNumber(32),
                ]),
            ]);

            this.loaded = true;
        },
    });
</script>

<style scoped>
    .card {
        min-width: 450px;
    }

    form {
        margin-top: 2rem;
    }

    .field {
        margin-bottom: 1.5rem;
    }

    @media screen and (max-width: 840px) {
        .card {
            width: 80%;
        }
    }
</style>

<template>
    <form @submit.prevent="submit" novalidate>
        <div class="row">
        
            <div class="col-md-6">
                <div
                    class="form-group"
                    :class="{ 'has-error': errors['first_name'] }">
                    <label class="control-label" for="first_name">
                      First Name
                    </label>

                    <input
                        v-model="contact.first_name"
                        type="text"
                        class="form-control"
                        id="first_name"
                        placeholder="First Name...">

                    <span class="help-block" v-for="error of errors['first_name']">
                        {{ error }}
                    </span>
                </div>
                <div
                    class="form-group"
                    :class="{ 'has-error': errors['first_name'] }">
                    <label class="control-label" for="last_name">
                        Last Name
                    </label>

                    <input
                        v-model="contact.last_name"
                        type="text"
                        class="form-control"
                        id="last_name"
                        placeholder="Last Name...">

                    <span class="help-block" v-for="error of errors['last_name']">
                        {{ error }}
                    </span>
                </div>

                <div
                    class="form-group"
                    :class="{ 'has-error': errors['phone'] }">
                    <label class="control-label" for="phone">
                        Phone number
                    </label>

                    <input
                        v-model="contact.phone"
                        type="phone"
                        class="form-control"
                        id="phone"
                        placeholder="phone...">

                    <span class="help-block" v-for="error of errors['phone']">
                        {{ error }}
                    </span>
                    <input
                            v-model="contact.created_by"
                            type="hidden" id="created_by">
                    <input
                            v-model="userId"
                            type="hidden" id="updated_by">
                    <input
                            v-model="contact.id"
                            type="hidden" id="id">
                </div>
            </div>
        </div>

        <div class="row mrg-top-1em">
            <div class="col-md-6 text-center">
                <button class="btn btn-primary"  @click="cancelAction()">
                    Back
                </button>
            </div>
            <div class="col-md-6 text-center">
                <button class="btn btn-primary">
                    <i class="glyphicon glyphicon-save"></i>
                    Save
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    import { event }  from '../app';
    export default {
        props: {
            contact: {
                type: Object,
                required: true
            },
            userId: {
                type: Number,
                required: true
            },
            errors: {
                type: Object,
                default () {
                    return null;
                }
            },
        },
        data() {
            return {

            }
        },

        methods: {
            submit() {
                let formData = new FormData();
                formData.set('_method', 'PUT');
                formData.set('created_by',  this.contact.created_by);
                formData.set('updated_by',  this.contact.updated_by);
                formData.set('first_name', this.contact.first_name);
                formData.set('last_name', this.contact.last_name);
                formData.set('phone', this.contact.phone);
                this.$emit('submitted', formData);
            },
            cancelAction() {
                this.$emit('canceled');
            },
            showErros(erros) {
                console.log(errors);
            }
        }
    }
</script>

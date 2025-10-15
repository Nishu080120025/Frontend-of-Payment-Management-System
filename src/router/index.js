import { createRouter, createWebHistory } from 'vue-router'
import UserList from '../views/user/UserList.vue'
import UserForm from '../views/user/UserForm.vue'
import PaymentDetail from '../views/Payments/PaymentDetail.vue'
import PaymentForm from '../views/Payments/PaymentForm.vue'
import PaymentList from '../views/Payments/PaymentList.vue'


const routes = [
  { path: '/', redirect: '/payments' },
  { path: '/users', component: UserList },
  { path: '/users/new', component: UserForm },
  { path: '/users/edit/:id', component: UserForm, props: true }, // <-- Add this for user edit
  { path: '/payments', component: PaymentList },
  { path: '/payments/new', component: PaymentForm },
  { path: '/payments/edit/:id', component: PaymentForm, props: true }, // <-- Add this for payment edit
  { path: '/payments/:id', component: PaymentDetail, props: true },
]


export default createRouter({
  history: createWebHistory(),
  routes
})

<script setup lang="ts">
import { QList, QItem, QItemSection, QItemLabel, QExpansionItem, QIcon } from 'quasar';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { label: 'Topic', icon: 'home', route: '/topic/list' },
  { label: 'Producer', icon: 'home', route: '/link1' },
  {
    label: 'Consumer',
    icon: 'hub',
    children: [
      { label: 'Consumer group', icon: 'send', route: '/kafka/producer' },
      { label: 'Consumers', icon: 'download', route: '/kafka/consumer' }
    ]
  }
];
</script>

<template>
  <q-drawer show-if-above bordered class="text-white">
    <q-list padding>
      <div class="banner q-pa-md flex items-center">
        <q-icon name="pipe" size="24px" class="q-mr-sm" />
        <div class="text-h6">Ingestor Data Pipeline</div>
      </div>
      <q-separator color="grey-8" />
      <template v-for="(item, index) in menuItems" :key="index" class="q-mb-xl">
        <!-- Dropdown Items -->
        <q-expansion-item
          v-if="item.children"
          expand-separator
          :icon="item.icon"
          :label="item.label"
        >
          <q-item
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            clickable
            v-ripple
            :to="child.route"
          >
            <q-item-section avatar>
              <q-icon :name="child.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ child.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Single Items -->
        <q-item
          v-else
          clickable
          v-ripple
          :to="item.route"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-drawer>
</template>

<style scoped>
.bg-dark {
  background-color: #1d1d1d;
}

.q-item {
  color: white;
}

.q-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.q-expansion-item__content .q-item {
  padding-left: 50px;
}

.banner {
  background-color: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  height: 60px;
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Optional hover effect */
.banner:hover {
  background-color: rgba(255, 255, 255, 0.15);
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>

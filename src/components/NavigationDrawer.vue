<template>
	<div>
		<v-navigation-drawer v-model="drawer" absolute temporary app>
			<v-list nav dense>
				<v-list-item-group active-class="deep-purple--text text--accent-4">
					<v-list-item :to="`/`">
						<v-list-item-icon>
							<v-icon>mdi-home</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Home</v-list-item-title>
					</v-list-item>

					<v-list-item :to="`/login`">
						<v-list-item-icon>
							<v-icon>mdi-login</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Login</v-list-item-title>
					</v-list-item>

					<v-list-item :to="`/register`">
						<v-list-item-icon>
							<v-icon>mdi-account-plus</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Register</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
export default {
	props: ["drawer"],
};
</script>

<v-layout row wrap class="mt-5">
      <v-flex md2 lg1 v-if="screenWidth > 960">
        <v-img :src="require('@/assets/logo.png')"></v-img>
      </v-flex>
      <v-flex xs10 md8 offset-lg1>
        <v-text-field
          v-model="form.endpoint"
          @keyup.13="goToEndpoint"
          solo
          :rules="rules"
          placeholder="Endpoint"
        ></v-text-field>
      </v-flex>
      <v-flex xs2 md1 class="mt-1" :class="screenWidth < 600 ? 'px-2' : 'px-5'">
        <v-btn
          small
          :disabled="!this.isValidUrl(form.endpoint)"
          @click="goToEndpoint"
          fab
          dark
          mdall
          color="pink"
        >
          <v-icon dark>arrow_forward_ios</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

<v-layout row wrap>
      <v-flex xs12 md8 class="mb-5">
        <div class="pa-5" v-if="!$route.query.endpoint">
          <div class="title mb-3">
            Welcome To VSAJ (Visualization of API JSON)
          </div>
          <ul>
            <li>
              This website processes data which comes from api response and
              visualizes in a better format ( by using datatable or cards )
            </li>
            <li>
              According to data type, automatically datatables or cards are
              generated.
            </li>
            <li>
              If you don't understand how it works, you can always take a look
              at example endpoints. ( Don't forget to hover over information
              icon ! )
            </li>
            <li>Enjoy it !</li>
            <li class="error--text subtitle-2">
              If the object has another object as a property, this will not be
              shown in datatable
            </li>
          </ul>
        </div>

        <!-- HTTP Response Code -->
        <v-toolbar
          v-if="responseCode"
          :color="responseCode === 200 ? 'teal darken-1' : 'error'"
          dark
        >
          <v-toolbar-title>Status: {{ responseCode }}</v-toolbar-title>
        </v-toolbar>
        <!-- Error Messages -->
        <v-card v-if="error">
          <ErrorMessage :error="error" />
        </v-card>

        <ManyData
          v-if="this.headers.length > 0"
          :headers="headers"
          :body="body"
          :screenWidth="screenWidth"
        />

        <SingleData v-if="singleData" :singleData="singleData" />
      </v-flex>
      <v-flex xs12 md4 class="mb-5" :class="screenWidth < 960 ? '' : 'px-5'">
        <v-btn block color="pink" dark @click="goHome">Home</v-btn>
        <GoByClick
          @endpoint-clicked="goHistory"
          :dataset="examples"
          title="Some Example Endpoints"
        />
        <GoByClick
          v-if="history.length > 0"
          @endpoint-clicked="goHistory"
          :dataset="history"
          title="My Last Visits"
        />
        <SocialMediaLinks />
      </v-flex>
    </v-layout>

const envApp = "http://localhost:5000/"


const envCar ="karhabtyCar/car"
export const Url_get_all_cars =`${envApp}karhabtyCar/cars`;
export const Url_search_cars =`${envApp}karhabtyCar/search`;
export const Url_get_car_ById =`${envApp}${envCar}`;
export const Url_add_car =`${envApp}${envCar}`;
export const Url_update_car_ById =`${envApp}${envCar}/`;
export const Url_delete_car_ById =`${envApp}${envCar}/`;

const envRate = "karhabtyCar/review/"
export const Url_get_review_ById =`${envApp}${envRate}`;
export const Url_get_review_ByCar =`${envApp}karhabtyCar/reviewCar/`;

const envAuth ="karhabty/"
export const Url_Register =`${envApp}${envAuth}singup`;
export const Url_login =`${envApp}${envAuth}login`;


const envUser ="karhabtyUser/"
export const Url_get_agency_ById = `${envApp}${envUser}agency`;
export const Url_get_user_ById = `${envApp}${envUser}/user/`;
export const Url_all_user_ByRole = `${envApp}${envUser}/users/`;
export const Url_update_User_ById = `${envApp}${envUser}user/`;

const envOrder ="karhabtyOrder/order/"
export const Url_add_order = `${envApp}${envOrder}`;
export const Url_update_order_ById = `${envApp}${envOrder}`;
export const Url_delete_user_ById = `${envApp}${envOrder}`;
export const Url_get_order_ById = `${envApp}${envOrder}`;
export const Url_get_order_ByUser = `${envApp}${envOrder}orders/`;
export const Url_all_orders = `${envApp}${envOrder}`;
export const Url_all_active_orders = `${envApp}${envOrder}status/`;
export const Url_add_payement_method = `${envApp}${envOrder}payement`;


const envAnnouncement ="karhabtyAnnouncement/announcement/"
export const Url_add_announcement = `${envApp}${envAnnouncement}`;
export const Url_update_announcement_ById = `${envApp}${envAnnouncement}`;
export const Url_delete_announcement_ById = `${envApp}${envAnnouncement}`;
export const Url_get_announcement_ById = `${envApp}${envAnnouncement}`;
export const Url_all_announcement = `${envApp}${envAnnouncement}`;
export const Url_all_active_announcement = `${envApp}karhabtyAnnouncement/activeAnnouncement`;
export const Url_get_announcement_ByAgency =`${envApp}karhabtyAnnouncement/allAnnouncement`;



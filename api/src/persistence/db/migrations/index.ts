import migration01 from "./20250420143000-create-registered-role";
import migration02 from "./20250427163900-create-svc-domain-events";
import migration03 from "./20250510160100-create-mw-accounts";
import migration04 from "./20250510162900-create-ur-users";
import migration05 from "./20250511201900-alter-ur-users";
import migration06 from "./20250511203000-alter-svc-domain-events";

export default [
  migration01,
  migration02,
  migration03,
  migration04,
  migration05,
  migration06,
];

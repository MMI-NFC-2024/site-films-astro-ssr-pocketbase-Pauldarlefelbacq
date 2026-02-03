import type { TypedPocketBase } from "./pocketbase-types";

declare global {
    namespace App {
        interface locals {
            pb:TypedPocketBase;
        }
    }
}

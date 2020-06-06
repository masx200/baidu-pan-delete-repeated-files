import {
    deletefiles /* , initPANENV  */,
} from "@masx200/fetch-baidu-pan-files";
import findrepeat from "@masx200/mongodb-file-find-md5-repeat";
import fsextra from "fs-extra";
async function start() {
    // const panenv = await initPANENV();
    const jsonfile = await findrepeat(
        "baidupan",
        /* "pan_" + panenv.user, */ "panfile"
    );
    const dataarray = await fsextra.readJSON(jsonfile);
    if (!Array.isArray(dataarray)) {
        throw TypeError("invalid data array");
    }
    const values = Object.values(Object.fromEntries(dataarray));
    const filestodelete = values
        .map((paths) => {
            if (!Array.isArray(paths)) {
                throw TypeError("invalid data array");
            }
            return paths.slice(1);
        })
        .flat();
    console.log("要删除的文件", filestodelete);
    await deletefiles(filestodelete);
    console.log("删除文件全部成功!");
}
export { start };

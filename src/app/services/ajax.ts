import $ from "jquery";

export function ajax(settings: any): Promise<any> {
  return new Promise((resolve, reject) => {

    const request = $.ajax(settings);

    request.done((response) => {
      resolve(response);
    });

    request.fail((jqXHR, textStatus) => {
      reject(JSON.parse(jqXHR.responseText).message);
    });
  });
}

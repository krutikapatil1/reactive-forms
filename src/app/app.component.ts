import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  projectStatusForm: FormGroup;
  defaultSelectedStatus: string = "Stable";
  projectStatuses: string[] = ["Stable", "Critical", "Finished"];
  forbiddenProjectNames: string[] = ["Test"];
  projectStatusObj = {
    projectName: "",
    email: "",
    projectStatus: ""
  };
  submitted: boolean = false;

  ngOnInit() {
    this.projectStatusForm = new FormGroup({
      projectName: new FormControl("Test2", [
        Validators.required,
        this.forbiddenNames.bind(this)
      ]),
      mail: new FormControl(
        "test2@test.com",
        [Validators.required, Validators.email],
        this.forbiddenEmails
      ),
      projectStatus: new FormControl("Stable", Validators.required)
    });
    this.projectStatusForm.statusChanges.subscribe(status => {
      console.log(status);
    });
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return { projectNameisForbidden: true };
    } else {
      return null;
    }
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    this.submitted = true;
    this.projectStatusObj.projectName = this.projectStatusForm.get(
      "projectName"
    ).value;
    this.projectStatusObj.email = this.projectStatusForm.get("mail").value;
    this.projectStatusObj.projectStatus = this.projectStatusForm.get(
      "projectStatus"
    ).value;
    console.log("Your Data: ");
    console.log(this.projectStatusObj.projectName);
    console.log(this.projectStatusObj.email);
    console.log(this.projectStatusObj.projectStatus);
  }
}

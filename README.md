Quy tắc sử dụng git chung của team:
1. Clone code trên remote về: git clone 
2. Kiểm tra nhánh trên local: git branch -a xem thử đã có nhánh origin/shopping-ver1 chưa
3. Tạo nhánh làm việc của mình trên local từ nhánh origin/shopping-ver1: git checkout -b local_branch_name(tự đặt) origin/shopping-ver1
4. Sau khi tạo nhánh thì bắt đầu làm phần việc của mình và commit, các lệnh commit: 
	+ git status
	+ git add .
	+ git commit -m 'Tên - phần việc hoàn thành - ngày'
	Ví dụ: git commit -m 'Bình - Complete view home page - 13.10.2020'
5. Push code:
	+Trước khi push code thì pull code về: git pull --rebase hoặc git fetch  (git pull --rebase = git fetch + git rebase)
	+Push lên nhánh origin/shopping-ver1: git push -u origin HEAD:shopping-ver1